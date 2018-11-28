const { join } = require('path');
const { spawn } = require('child_process');
const {
  Sparky,
  FuseBox,
  EnvPlugin,
  CSSPlugin,
  SassPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  CopyPlugin,
  JSONPlugin,
} = require('fuse-box');

const isProduction = process.env.NODE_ENV === 'prod';

class Builder {
  constructor(name, target) {
    this.name = name;
    this.target = target;

    let desktop = false;
    let output = '$name.js';

    if (target === 'electron') {
      output = join('desktop', output);
      desktop = true;
    } else if (name === 'client') {
      output = join('client', output);
    }

    this.config = Builder.getConfig(target, name, output, desktop);
    this.addPlugins(target !== 'server');
  }

  static getConfig(target, name, output = '$name.js', desktop = false) {
    return {
      target: target,
      homeDir: 'src/',
      output: join('build', output),
      tsConfig: './tsconfig.json',
      useTypescriptCompiler: true,
      sourceMaps: target !== 'server',
      hash: isProduction,
      cache: !isProduction,
      plugins: [
        EnvPlugin({
          NODE_ENV: isProduction ? 'production' : 'development',
          DESKTOP: desktop,
        }),
        isProduction &&
          QuantumPlugin({
            bakeApiIntoBundle: name,
            treeshake: true,
            removeExportsInterop: false,
            target: target,
            uglify: {
              es6: true,
            },
          }),
      ],
    };
  }

  init(instructions, watch, devServerOptions = {}) {
    this.fuse = FuseBox.init(this.config);
    this.app = this.fuse.bundle(this.name).instructions(instructions);

    if (!isProduction) {
      if (this.target !== 'server') {
        this.fuse.dev(devServerOptions);
        this.app.hmr();
      }

      this.app.watch(watch);
    }

    this.fuse.run();
  }

  addPlugins(renderer = false) {
    this.config.plugins.push(JSONPlugin());
    if (!renderer) return;

    this.addWebIndexPlugin('index');
    this.addCopyPlugin();
    this.config.plugins.push([SassPlugin(), CSSPlugin()]);
  }

  addWebIndexPlugin(name) {
    this.config.plugins.push(
      WebIndexPlugin({
        template: `src/shared/resources/pages/${name}.html`,
        path: './',
      }),
    );
  }

  addCopyPlugin() {
    this.config.plugins.push(
      CopyPlugin({
        files: ['*.woff2', '*.png', '*.svg'],
        dest: '../assets',
        resolve: isProduction ? './assets' : '/assets',
      }),
    );
  }
}

Sparky.task('clean', async () => {
  await Sparky.src('./build')
    .clean('build/')
    .exec();
});

Sparky.task('full-server', [
  (isProduction && 'clean') || '',
  'client',
  'server',
]);

Sparky.task('full-desktop', [
  (isProduction && 'clean') || '',
  'desktop',
  'desktop-main',
]);

Sparky.task('server', () => {
  const builder = new Builder('server', 'server');

  builder.init('> [server/index.ts]', 'server/**');

  !isProduction &&
    spawn('npm', ['run', 'start-server'], {
      shell: true,
      stdio: 'inherit',
    });
});

Sparky.task('client', () => {
  const builder = new Builder('client', 'browser@es6');

  builder.init('> renderer/index.tsx', 'renderer/**', {
    port: 3000,
    fallback: 'index.html',
  });
});

Sparky.task('desktop-main', () => {
  const builder = new Builder('main', 'server');

  builder.init('> [main/index.ts]', 'main/**');

  !isProduction &&
    spawn('npm', ['run', 'start-desktop'], {
      shell: true,
      stdio: 'inherit',
    });
});

Sparky.task('desktop', () => {
  const builder = new Builder('app', 'electron');

  builder.init('> renderer/index.tsx', 'renderer/**');
});
