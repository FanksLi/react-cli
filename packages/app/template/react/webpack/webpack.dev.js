
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const config = baseConfig(true);
module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: false,
    port: 8000,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    proxy: [
      {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: {'^/api': '' },
        }
      }
    ]
  }
})