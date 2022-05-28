import clear from 'rollup-plugin-clear';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'out-tsc/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/index.mjs',
        sourcemap: true,
      },
      {
        format: 'cjs',
        file: 'dist/index.js',
        sourcemap: true,
      },
    ],
    external: ['vue'],
    plugins: [
      clear({
        targets: ['./dist'],
      }),
      typescript(),
    ],
  },
  {
    input: 'out-tsc/dts/index.d.ts',
    output: {
      format: 'es',
      file: 'dist/index.d.ts',
    },
    plugins: [dts()],
  },
];
