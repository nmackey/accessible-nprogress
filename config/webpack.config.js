const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const libraryName = 'accessible-nprogress';

const BANNER = `
  ${(new Date()).toString()}
  Accessible NProgress, (c) 2021 Nicholas Mackey - http://nmackey.com/accessible-nprogress
  @license MIT
`;

let outputJs;
let outputCss;
const plugins = [
  new webpack.BannerPlugin(BANNER),
  new webpack.NoEmitOnErrorsPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  outputJs = `${libraryName}.min.js`;
  outputCss = `${libraryName}.min.css`;
} else {
  outputJs = `${libraryName}.js`;
  outputCss = `${libraryName}.css`;
}

plugins.push(new MiniCssExtractPlugin({ filename: outputCss }));

const config = {
  mode: process.env.NODE_ENV,
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: outputJs,
    library: 'NProgress',
    libraryExport: 'default',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins,
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: /^\**!|@preserve|@license|@cc_on/i,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = config;
