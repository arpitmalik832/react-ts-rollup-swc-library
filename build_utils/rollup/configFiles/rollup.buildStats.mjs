import buildStats from '../customPlugins/buildStats.mjs';

/**
 * @returns {import('rollup').RollupOptions}
 */
function getConfig(type) {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `distInfo/${type === 'svgr' ? 'svgr' : 'main'}/${process.env.LIB_ENV}/buildStats`;

  return {
    plugins: [buildStats(`${path}/${timestamp}.json`)],
  };
}

export default getConfig;
