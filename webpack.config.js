const { spawn } = require('child_process');

const { getConfig, dev } = require('./webpack.config.base');

const mainConfig = getConfig({
  target: 'electron-main',

  devtool: 'inline-source-map',

  watch: dev,

  entry: {
    main: './src/main',
  },

  plugins: [],
});

if (process.env.START === '1') {
  let electronProcess;

  mainConfig.plugins.push({
    apply: compiler => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
        if (electronProcess) {
          try {
            if (process.platform === 'win32') {
              execSync(`taskkill /pid ${electronProcess.pid} /f /t`);
            } else {
              electronProcess.kill();
            }

            electronProcess = null;
          } catch (e) {}
        }

        electronProcess = spawn('npm', ['start'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        });
      });
    },
  });
}

module.exports = mainConfig;
