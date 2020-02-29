const { resolve } = require('path');
const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const INCLUDE = resolve(__dirname, 'src');

const dev = process.env.ENV === 'dev';

const getExternals = arr => {
  const ext = {};
  for (const item of arr) {
    ext[item] = `require('${item}')`;
  }
  return ext;
};

const config = {
  mode: dev ? 'development' : 'production',

  devtool: dev ? 'eval-source-map' : 'source-map',

  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.tsx|ts$/,
        loader: 'babel-loader',
        include: INCLUDE,
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: {
      '~': INCLUDE,
    },
  },

  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },

  plugins: [],

  externals: getExternals(['keytar', 'sqlite3']),
};

if (dev) {
  config.plugins.push(new HardSourceWebpackPlugin());
}

function getConfig(...cfg) {
  return merge(config, ...cfg);
}

module.exports = { getConfig, dev };
