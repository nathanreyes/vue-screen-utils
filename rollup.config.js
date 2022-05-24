import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';

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
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
        include: null,
      },
    }),
    clear({
      targets: ['./dist'],
    }),
  ],
};
