const { smart } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const baseConfig = require('./webpack.config.base');

module.exports = smart(baseConfig, {
  mode: 'development',
  target: 'node',

  entry: './src/server',
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
  },

  externals: [nodeExternals()],
});
