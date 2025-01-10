import dts from 'rollup-plugin-dts';
import replace from '@rollup/plugin-replace';

const config = {
  input: 'dist/types/src/index.d.ts',
  output: {
    file: 'dist/lib.d.ts',
    format: 'es',
  },
  plugins: [
    replace({
      preventAssignment: true,
      delimiters: ['', ''],
      include: ['dist/types/**/*.d.ts'],
      values: {
        "import '../../static/styles/postcss-processed/index.css';": '',
      },
    }),
    dts(),
  ],
};

export default config;
