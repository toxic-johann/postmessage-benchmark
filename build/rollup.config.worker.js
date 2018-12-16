// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';
// import sourcemaps from 'rollup-plugin-sourcemaps';
// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';

export default {
  output: {
    format: 'umd',
    file: 'dist/worker.js',
    name: 'Test',
    sourceMap: true,
  },
  input: 'src/worker.js',
  plugins: [
  ],
};
