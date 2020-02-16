const { getConfig, dev } = require('./webpack.config.base');

const mainConfig = getConfig({
  target: 'electron-main',

  watch: dev,

  entry: {
    main: './src/main',
  },

  plugins: [],
});

module.exports = mainConfig;
