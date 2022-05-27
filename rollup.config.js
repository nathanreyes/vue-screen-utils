import clear from 'rollup-plugin-clear';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/lib.mjs',
    },
    {
      format: 'cjs',
      file: 'dist/lib.js',
    },
  ],
  plugins: [
    clear({
      targets: ['./dist'],
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
        include: null,
      },
    }),
    terser({
      format: { comments: false },
      compress: false,
    }),
  ],
};
