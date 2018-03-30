const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const libraryName = 'accessible-nprogress';

const BANNER = `
  ${(new Date()).toString()}
  Accessible NProgress, (c) 2018 Nicholas Mackey - http://nmackey.com/accessible-nprogress
  @license MIT
`;

let outputJs;
let outputCss;
const plugins = [
  new webpack.BannerPlugin(BANNER),
  new webpack.NoEmitOnErrorsPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      unused: true,
    },
    output: {
      ascii_only: true,
    },
    sourceMap: false,
    mangle: true,
  }));
  outputJs = `${libraryName}.min.js`;
  outputCss = `${libraryName}.min.css`;
} else {
  outputJs = `${libraryName}.js`;
  outputCss = `${libraryName}.css`;
}

plugins.push(new ExtractTextPlugin(outputCss));

const config = {
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: outputJs,
    library: 'NProgress',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: '.babelcache',
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: process.env.NODE_ENV === 'production' },
            },
          ],
        }),
      },
    ],
  },
  plugins,
};

module.exports = config;

