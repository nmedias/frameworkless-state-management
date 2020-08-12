/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require('path');
const config = require('./config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: {
    app: Path.resolve(config.srcPath, './js/index'),
  },
  output: {
    path: config.buildPath,
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      {
        context: Path.resolve(__dirname, '../'),
        from: config.public,
        to: config.public,
      },
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(config.srcPath, './index.html'),
    }),
  ],
  resolve: {
    alias: {
      '@': config.srcPath,
    },
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              babelCore: '@babel/core',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: config.srcPath,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /.*\.(jpg|png|gif|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: Path.resolve(config.srcPath, './images'),
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.mp4|webm(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'videos/',
            },
          },
        ],
      },
      {
        test: /.*\.(woff|woff2|eot|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};
