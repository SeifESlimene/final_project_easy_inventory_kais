const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const API_URL = 'http://localhost:5008';

module.exports = {
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src', 'index.js')],
  output: { path: path.resolve(__dirname, 'dist') },
  mode: 'development',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 7001,
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL),
      },
    }),
  ],
};