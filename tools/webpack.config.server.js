const appRootDir = require('app-root-dir');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  name: 'server',
  mode: 'production',
  externals: [nodeExternals()],
  entry: [
    'babel-polyfill',
    path.resolve(appRootDir.get(), './src/server/index.js'),
  ],
  output: {
    path: path.resolve(appRootDir.get(), './dist'),
    filename: '[name]-bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
