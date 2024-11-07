import baseConfig from './rollup.main.common.mjs';
import minimizerConfig from './rollup.minimizer.mjs';
import stripCustomWindowVariablesConfig from './rollup.stripCustomWindowVariables.mjs';
import visualizerConfig from './rollup.visualizer.mjs';
import buildStatsConfig from './rollup.buildStats.mjs';
import {
  ERR_NO_APP_ENV_FLAG,
  ERR_NO_LIB_ENV_FLAG,
} from '../../config/logs.mjs';
import { ENVS } from '../../config/index.mjs';

/**
 * @returns {import('rollup').RollupOptions[]}
 */
function getAddons() {
  const addMinimizer =
    process.env.LIB_ENV && [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV);
  const addStripCustomWindowVariables =
    process.env.LIB_ENV && [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV);
  const addVisualizer = process.env.INCLUDE_VISUALIZER === 'true';
  const addBuildStats = process.env.INCLUDE_BUILD_STATS === 'true';

  const configs = [];
  if (addMinimizer) configs.push(minimizerConfig);
  if (addStripCustomWindowVariables)
    configs.push(stripCustomWindowVariablesConfig);
  if (addVisualizer) configs.push(visualizerConfig('main'));
  if (addBuildStats) configs.push(buildStatsConfig('main'));

  return configs;
}

/**
 * @returns {import('rollup').RollupOptions}
 */
function getConfig() {
  if (!process.env.LIB_ENV) {
    throw new Error(ERR_NO_LIB_ENV_FLAG);
  }
  if (!process.env.APP_ENV) {
    throw new Error(ERR_NO_APP_ENV_FLAG);
  }

  const addons = getAddons();

  return {
    ...baseConfig,
    plugins: [...baseConfig.plugins, ...addons.flatMap(addon => addon.plugins)],
  };
}

export default getConfig;
