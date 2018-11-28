const { join } = require('path');
const { spawn } = require('child_process');
const {
  Sparky,
  FuseBox,
  EnvPlugin,
  CSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  CopyPlugin,
} = require('fuse-box');

const isProduction = process.env.NODE_ENV === 'production';

class Config {
  constructor(target, name, output = '$name.js', desktop = false) {
    this.data = {
      target: target,
      homeDir: 'src/',
      output: join('build', output),
      tsConfig: './tsconfig.json',
      useTypescriptCompiler: true,
      sourceMaps: true,
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

  get() {
    return this.data;
  }

  addWebIndexPlugin(name) {
    this.data.plugins.push(
      WebIndexPlugin({
        template: `src/shared/resources/pages/${name}.html`,
        path: './',
      }),
    );
  }

  addCopyPlugin() {
    this.data.plugins.push(
      CopyPlugin({
        files: ['*.woff2', '*.png', '*.svg'],
        dest: '../assets',
        resolve: isProduction ? './assets' : '/assets',
      }),
    );
  }
}

class DekstopRendererConfig extends Config {
  constructor() {
    super('electron', 'app', join('desktop', '$name.js'), true);

    this.addWebIndexPlugin('index');
    this.addCopyPlugin();
  }
}

class ClientConfig extends Config {
  constructor() {
    super('browser@es6', 'client', join('client', '$name.js'));

    this.addWebIndexPlugin('index');
    this.addCopyPlugin();
  }
}

Sparky.task('clean', () => {
  return Promise.all([
    Sparky.src('./build')
      .clean('build/')
      .exec(),
  ]);
});

Sparky.task('desktop', ['desktop-renderer', 'desktop-main']);

Sparky.task('desktop-renderer', () => {
  const cfg = new DekstopRendererConfig().get();
  const fuse = FuseBox.init(cfg);

  if (!isProduction) {
    fuse.dev({ httpServer: true });
  }

  const app = fuse.bundle('app').instructions('> [client/index.tsx]');

  if (!isProduction) {
    app.hmr().watch();
  }

  fuse.run();
});

Sparky.task('desktop-main', () => {
  const cfg = new Config('server', 'main').get();
  cfg.sourceMaps = false;
  const fuse = FuseBox.init(cfg);
  const app = fuse.bundle('main').instructions(`> [main/index.ts]`);

  if (!isProduction) {
    app.watch();

    return fuse.run().then(() => {
      spawn('npm', ['run', 'start-desktop'], {
        shell: true,
        stdio: 'inherit',
      });
    });
  }

  fuse.run();
});

Sparky.task('server', ['client', 'server-main']);

Sparky.task('client', () => {
  const cfg = new ClientConfig().get();
  const fuse = FuseBox.init(cfg);
  const app = fuse.bundle('client').instructions('> client/index.tsx');

  if (!isProduction) {
    fuse.dev({
      port: 3000,
      fallback: 'index.html',
    });

    app.hmr().watch('client/**');
  }

  fuse.run();
});

Sparky.task('server-main', () => {
  const cfg = new Config('server', 'server', `$name.js`).get();
  cfg.sourceMaps = false;
  const fuse = FuseBox.init(cfg);
  const app = fuse.bundle('server').instructions('> [server/index.ts]');

  if (!isProduction) {
    app.watch('server/**');

    return fuse.run().then(() => {
      spawn('npm', ['run', 'start-server'], {
        shell: true,
        stdio: 'inherit',
      });
    });
  }

  fuse.run();
});
