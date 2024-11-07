import { visualizer } from 'rollup-plugin-visualizer';

/**
 * @returns {import('rollup').RollupOptions}
 */
function getConfig(type) {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `distInfo/${type === 'svgr' ? 'svgr' : 'main'}/${process.env.LIB_ENV}/visualizers/${timestamp}`;

  return {
    plugins: [
      visualizer({
        filename: `${path}/flamegraph.html`,
        template: 'flamegraph',
      }),
      visualizer({
        filename: `${path}/list.html`,
        template: 'list',
      }),
      visualizer({
        filename: `${path}/network.html`,
        template: 'network',
      }),
      visualizer({
        filename: `${path}/raw-data.html`,
        template: 'raw-data',
      }),
      visualizer({
        filename: `${path}/sunburst.html`,
        template: 'sunburst',
      }),
      visualizer({
        filename: `${path}/treemap.html`,
        template: 'treemap',
      }),
    ],
  };
}

export default getConfig;
