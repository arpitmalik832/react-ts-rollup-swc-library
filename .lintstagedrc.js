const config = {
  '**/*.{mjs,cjs,js,jsx,ts,tsx,mdx,md}': [
    'pnpm lint-js:fix',
    'pnpm prettier:fix',
  ],
  '**/*.{css,scss}': ['pnpm lint-css:fix', 'pnpm prettier:fix'],
  '**/*.json': ['pnpm prettier:fix'],
};

export default config;
