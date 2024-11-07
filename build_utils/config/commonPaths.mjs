import { resolve, join } from 'path';

const PROJECT_ROOT = resolve();

const projectRootPath = PROJECT_ROOT;
const entryPath = join(PROJECT_ROOT, 'src', 'index.ts');
const outputPath = join(PROJECT_ROOT, 'dist');
const iconsPath = join(PROJECT_ROOT, 'src', 'assets', 'icons');
const iconsListJSPath = join(PROJECT_ROOT, 'static', 'enums', 'icons_list.mjs');
const iconsListTSPath = join(PROJECT_ROOT, 'static', 'enums', 'icons_list.ts');
const stylesPath = join(outputPath, 'index.css');

export {
  projectRootPath,
  entryPath,
  outputPath,
  iconsPath,
  iconsListJSPath,
  iconsListTSPath,
  stylesPath,
};
