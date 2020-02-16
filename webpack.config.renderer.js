const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { getConfig, dev } = require('./webpack.config.base');

const PORT = 4444;
const INCLUDE = resolve(__dirname, 'src');

// const applyEntries = (scope, config, entries) => {
//   for (const entry of entries) {
//     config.entry[entry] = [`./src/renderer/${entry}`];
//     config.plugins.push(getHtml(scope, entry));

//     if (dev) {
//       config.entry[entry].unshift('react-hot-loader/patch');
//     }
//   }
// };

// const getBaseConfig = name => {
//   const config = {
//     plugins: [],

//     output: {},
//     entry: {},

//     optimization: {
//       splitChunks: {
//         cacheGroups: {
//           vendor: {
//             chunks: 'initial',
//             name: `vendor.${name}`,
//             minChunks: 2,
//           },
//         },
//       },
//     },
//   };

//   return config;
// };

const appConfig = getConfig({
  name: 'app',
  target: 'electron-renderer',

  entry: {
    app: ['react-hot-loader/patch', './src/renderer/app'],
  },

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    port: PORT,
    hot: true,
    inline: true,
    disableHostCheck: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        include: INCLUDE,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Qusly',
      template: 'static/pages/app.html',
      filename: `app.html`,
      chunks: 'app',
    }),
  ],

  optimization: {
    minimizer: !dev
      ? [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 8,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              output: {
                ecma: 8,
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            cache: true,
            sourceMap: dev,
          }),
        ]
      : [],
    namedModules: true,
    noEmitOnErrors: true,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: `app`,
          minChunks: 2,
        },
      },
    },
  },

  resolve: {
    alias: {
      'react-dom': dev ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
});

module.exports = appConfig;
