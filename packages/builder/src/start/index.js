
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Webpackserver = require('webpack-dev-server');
const getWebpackDevConfig = require('../config/webpack.dev');
const path = require('path');


module.exports = function start(options = {}) {
    const { cwd, config = {} } = options;
    const webpackConfig = getWebpackDevConfig({ cwd });
    const complier = webpack(merge(webpackConfig, config));
    const server = new Webpackserver({
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
                    pathRewrite: { '^/api': '' },
                }
            }
        ]
    }, complier);
    server.startCallback(() => {
        console.log('start success');
    });
}