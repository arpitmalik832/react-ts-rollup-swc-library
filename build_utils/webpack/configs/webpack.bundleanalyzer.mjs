import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { resolve } from 'path';

function getConfig() {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `distInfo/storybook/${process.env.STORY_ENV}/visualizer/`;

  return {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // Generate static HTML files
        reportFilename: resolve(path, `${timestamp}.html`), // Specify the output file name
        openAnalyzer: false, // Do not automatically open the report in the browser
      }),
    ],
  };
}

export default getConfig;
