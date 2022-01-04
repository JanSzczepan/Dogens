const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './js/index.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].bundle.js',
    // assetModuleFilename: './public/[name][ext][query]'
  },

  devServer: {
    open: true,
    static: path.resolve(__dirname, 'public'), 
    port: 3500,
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
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
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
