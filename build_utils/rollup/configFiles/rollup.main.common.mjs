import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc3';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import progress from 'rollup-plugin-progress';

import svgrConfig from '../../../svgr.config.mjs';
import importStyles from '../customPlugins/importStyles.mjs';
import { ENVS } from '../../config/index.mjs';
import {
  entryPath,
  outputPath,
  stylesPath,
} from '../../config/commonPaths.mjs';

/**
 * @returns {import('rollup').RollupOptions}
 */
const config = {
  input: entryPath,
  output: [
    {
      dir: outputPath,
      format: 'esm',
      sourcemap:
        process.env.LIB_ENV &&
        ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: `esm/[name].js`,
      chunkFileNames: `esm/[name].js`,
    },
    {
      dir: outputPath,
      format: 'cjs',
      sourcemap:
        process.env.LIB_ENV &&
        ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: `cjs/[name].js`,
      chunkFileNames: `cjs/[name].js`,
    },
  ],
  external: [/node_modules/], // Exclude node_modules
  plugins: [
    resolve({
      extensions: ['.ts', '.tsx', '.scss', '.css'],
    }),
    commonjs(),
    swc(),
    postcss({
      extensions: ['.css', '.scss'],
      extract: stylesPath,
      minimize:
        process.env.LIB_ENV &&
        [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
      modules: true,
      use: ['sass'],
    }),
    image(),
    url(),
    svgr(svgrConfig),
    json(),
    importStyles(),
    progress(),
  ],
};

export default config;
