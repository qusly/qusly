const { resolve, join } = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['awesome-typescript-loader'],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.tsx', '.ts', '.json'],
    alias: {
      '@client': join(__dirname, './src/client'),
      '@server': join(__dirname, './src/server'),
      '@': join(__dirname, './src/shared'),
      '~': join(__dirname, './src'),
    },
  },
};
