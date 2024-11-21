/* eslint-disable no-console */
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const updateTypographyUse = async () => {
  const filePath = join('dist', 'styles', 'mixins', 'typography.scss');
  try {
    let content = await readFile(filePath, 'utf8');
    content = content.replace(
      "@use '../../../static/styles/style-dictionary/typography' as t;",
      "@use '../style-dictionary/typography' as t;",
    );
    await writeFile(filePath, content, 'utf8');
    console.log('typography.scss updated successfully');
  } catch (error) {
    console.error('Error updating typography.scss ->', error);
  }
};

updateTypographyUse();
