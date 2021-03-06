const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');

const ROOT = path.join(__dirname, '../../');
const CONTEXT = path.join(ROOT, 'src');
const OUTPUT_PATH = path.join(ROOT, 'lib');

module.exports = {
  context: CONTEXT,
  entry: './index.js',
  output: {
    path: OUTPUT_PATH,
    filename: 'relative-ci-ui.js',
    library: 'relativeCiUI',
    libraryTarget: 'umd',
  },
  externals: {
    classnames: {
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames',
      root: 'classnames',
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'PropTypes',
      root: 'PropTypes',
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new StatsPlugin('../artifacts/webpack-stats.json', {
      all: false,
      assets: true,
      modules: true,
      chunks: true,
    }),
  ],
};
