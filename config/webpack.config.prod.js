const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './js/index.js',

  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: './images/[name][ext][query]'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader', 
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["transform-class-properties"],
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource"
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: './index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin(
      {
        patterns: [
          { from: "public/images", to: "images" },
          { from: "public/slick", to: "slick" },
        ],
        options: {
          concurrency: 100,
        },
      }
    )
  ]
};
