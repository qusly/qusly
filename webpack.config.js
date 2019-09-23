/* eslint-disable */
const { getConfig, dev } = require('./webpack.config.base');
/* eslint-enable */

const mainConfig = getConfig({
  target: 'electron-main',

  watch: dev,

  entry: {
    main: './src/main',
  },

  plugins: [],
});

module.exports = mainConfig;
