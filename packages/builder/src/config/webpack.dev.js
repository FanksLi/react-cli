
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports =  function getWebpackProdConfig(options) {
  const {cwd} = options;
  const config = baseConfig({ cwd, isDev: true });
  return merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      open: true,
      port: 8000,
      historyApiFallback: true,
      static: {
        directory: path.resolve(cwd, '../public'),
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
}


