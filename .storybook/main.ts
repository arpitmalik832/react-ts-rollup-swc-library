import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { Configuration, RuleSetRule } from 'webpack';
import { ENVS } from '../build_utils/config';
import svgrConfig from '../svgrConfig';
import { ERR_NO_STORY_ENV_FLAG } from '../build_utils/config/logs';
import getBundleAnalyzerConfig from '../build_utils/webpack/configs/webpack.bundleanalyzer';
import getBuildStatsConfig from '../build_utils/webpack/configs/webpack.buildstats';

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    'storybook-addon-render-modes',
  ],
  framework: '@storybook/react-webpack5',
  webpackFinal: (config: Configuration) => {
    if (!process.env.STORY_ENV) {
      throw new Error(ERR_NO_STORY_ENV_FLAG);
    }

    const isProd = process.env.STORY_ENV === ENVS.PROD;
    const isBeta = process.env.STORY_ENV === ENVS.BETA;

    // adding handling for js files
    config.module!.rules!.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: ['swc-loader'],
    });

    // adding handling for svg files
    const fileLoaderRule = (config.module!.rules as RuleSetRule[]).find(
      rule => !Array.isArray(rule.test) && (rule.test as RegExp).test('.svg'),
    );
    fileLoaderRule!.exclude = /\.svg$/;
    config.module!.rules!.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: svgrConfig }, 'url-loader'],
    });

    // adding handling for sass and scss files
    config.module!.rules!.push({
      test: /\.(scss|sass)$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: false,
            modules: {
              mode: 'local',
              localIdentName:
                isProd || isBeta
                  ? '[hash:base64:5]'
                  : '[name]-[local]-[hash:base64:5]',
            },
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
    });

    // adding code splitting
    // eslint-disable-next-line no-param-reassign
    config.optimization = {
      ...config.optimization,
      minimize: isProd || isBeta,
      minimizer:
        isProd || isBeta
          ? [
              new TerserPlugin({
                terserOptions: {
                  compress: {
                    inline: false,
                    drop_console: isProd,
                    dead_code: true,
                    drop_debugger: isProd,
                    conditionals: true,
                    evaluate: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    hoist_funs: true,
                    keep_fargs: false,
                    hoist_vars: true,
                    if_return: true,
                    join_vars: true,
                    side_effects: true,
                  },
                  mangle: true,
                  output: {
                    comments: false,
                  },
                },
              }),
              new CssMinimizerPlugin({
                minimizerOptions: {
                  preset: [
                    'default',
                    {
                      discardComments: { removeAll: true },
                    },
                  ],
                },
              }),
            ]
          : [],
      splitChunks: {
        chunks: 'all',
        maxSize: 200 * 1024, // 200 KB
      },
    };

    // adding compression plugin
    config.plugins!.push(
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css)$/,
      }),
    );

    const addVisualizer = process.env.INCLUDE_VISUALIZER === 'true';
    const addBuildStats = process.env.INCLUDE_BUILD_STATS === 'true';

    // adding visualizer plugin
    if (addVisualizer) {
      config.plugins!.push(getBundleAnalyzerConfig().plugins[0]);
    }

    // adding build stats plugin
    if (addBuildStats) {
      config.plugins!.push(getBuildStatsConfig().plugins[0]);
    }

    return config;
  },
};
