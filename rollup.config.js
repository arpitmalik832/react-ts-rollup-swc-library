import mainConfig from './build_utils/rollup/configFiles/rollup.main.mjs';
import svgrConfig from './build_utils/rollup/configFiles/rollup.svgr.mjs';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [mainConfig(), svgrConfig()];

export default config;
