import { BuildStatsPlugin } from '../customPlugins/BuildStats.mjs';

function getConfig() {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `distInfo/storybook/${process.env.STORY_ENV}/buildStats`;

  return {
    plugins: [
      new BuildStatsPlugin({
        outputPath: `${path}/${timestamp}.json`,
      }),
    ],
  };
}

export default getConfig;
