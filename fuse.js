const { join } = require('path');
const {
  FuseBox,
  EnvPlugin,
  QuantumPlugin,
  JSONPlugin,
  Sparky,
  CopyPlugin,
  WebIndexPlugin,
  StyledComponentsPlugin,
} = require('fuse-box');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

const production = process.env.NODE_ENV === 'prod';
const outputDir = 'build';

dotenv.config();

class Builder {
  constructor(
    config = {
      target: '',
      name: '',
      output: '',
      instructions: '',
      watch: '',
      watchFilter,
      runWhenCompleted: false,
      devServerOptions: {},
      plugins: [],
    },
  ) {
    const { target, name, output, plugins } = config;
    this.config = config;
    this.fuseConfig = Builder.getFuseConfig(target, name, output, plugins);
  }

  static getFuseConfig(target, name, output = '$name.js', plugins = []) {
    const { HOSTNAME, USER, PASSWORD, PROTOCOL, PORT, ENABLED } = process.env;

    return {
      target,
      homeDir: 'src/',
      output: join(outputDir, output),
      tsConfig: './tsconfig.json',
      useTypescriptCompiler: true,
      sourceMaps: !production,
      cache: !production,
      plugins: [
        EnvPlugin({
          NODE_ENV: production ? 'production' : 'development',
          HOSTNAME,
          USER,
          PASSWORD,
          PROTOCOL,
          PORT,
          ENABLED,
        }),
        JSONPlugin(),
        production &&
          QuantumPlugin({
            bakeApiIntoBundle: name,
            treeshake: true,
            removeExportsInterop: false,
            uglify: {
              es6: true,
            },
          }),
      ].concat(plugins),
      alias: {
        '~': '~/',
        '@renderer': '~/renderer/',
      },
      log: {
        showBundledFiles: false,
        clearTerminalOnBundle: true,
      },
    };
  }

  async init() {
    const {
      name,
      target,
      instructions,
      watch,
      watchFilter,
      runWhenCompleted,
      devServerOptions,
    } = this.config;
    const fuse = FuseBox.init(this.fuseConfig);
    const app = fuse.bundle(name).instructions(instructions);

    if (!production) {
      app.watch(watch, watchFilter);

      if (target !== 'server') {
        fuse.dev(devServerOptions);
        app.hmr();
      } else if (runWhenCompleted) {
        app.completed(proc => proc.start());
      }
    }

    return await fuse.run();
  }
}

Sparky.task('default', ['main', 'renderer']);

Sparky.task('main', async () => {
  await new Builder({
    name: 'main',
    target: 'server',
    instructions: '> [main/index.ts]',
    watch: 'main/**',
  }).init();
});

Sparky.task('renderer', async () => {
  await new Builder({
    name: 'app',
    target: 'electron',
    instructions: '> [renderer/index.tsx]',
    watch: 'renderer/**',
    devServerOptions: {
      httpServer: true,
    },
    plugins: [
      !production && StyledComponentsPlugin(),
      CopyPlugin({
        files: ['*.woff2', '*.svg'],
        dest: 'assets',
        resolve: production ? './assets' : '/assets',
      }),
      WebIndexPlugin({
        target: `index.html`,
        template: `src/renderer/resources/pages/index.html`,
        path: production ? '.' : '/',
      }),
    ],
  }).init();

  if (!production) {
    spawn('npm', ['start'], {
      shell: true,
      stdio: 'inherit',
    });
  }
});
