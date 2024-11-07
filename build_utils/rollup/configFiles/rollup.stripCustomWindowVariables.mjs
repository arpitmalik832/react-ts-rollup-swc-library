import stripCustomWindowVariables from '../customPlugins/stripCustomWindowVariables.mjs';

/**
 * @returns {import('rollup').RollupOptions}
 */
const config = {
  plugins: [
    stripCustomWindowVariables({
      variables: ['abc'],
    }),
  ],
};

export default config;
