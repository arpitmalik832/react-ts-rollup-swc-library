/* eslint-disable no-param-reassign */
import { ENVS } from '../../config/index.mjs';

/**
 * @returns {import('rollup').InputPluginOption}
 */
export default function importStyles() {
  return {
    name: 'import-styles-plugin',
    generateBundle(options, bundle) {
      const importPath = '../index.css';
      Object.entries(bundle).forEach(([fileName, fileMeta]) => {
        if (fileName === 'esm/index.js') {
          fileMeta.code = `import "${importPath}";${![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) ? '\n' : ''}${fileMeta.code}`;
        } else if (fileName === 'cjs/index.js') {
          fileMeta.code = `require("${importPath}");${![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) ? '\n' : ''}${fileMeta.code}`;
        }
      });
    },
  };
}
