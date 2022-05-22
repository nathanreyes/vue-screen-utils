import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
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
