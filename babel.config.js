const dev = process.env.NODE_ENV === 'development';

const getStyledComponentsPlugin = () => {
  return [
    'babel-plugin-styled-components',
    dev
      ? {
          displayName: true,
        }
      : {
          minify: true,
          transpileTemplateLiterals: true,
          pure: true,
          displayName: false,
        },
  ];
};

const presets = [
  '@babel/preset-env',
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const plugins = [
  getStyledComponentsPlugin(),
  '@babel/plugin-transform-runtime',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  'react-hot-loader/babel',
];

module.exports = { presets, plugins };
