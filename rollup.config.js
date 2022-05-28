import clear from 'rollup-plugin-clear';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'out-tsc/index.js',
  output: [
    {
      format: 'esm',
      file: 'dist/lib.mjs',
      sourcemap: true,
    },
    {
      format: 'cjs',
      file: 'dist/lib.js',
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
};
