const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Webpackserver = require('webpack-dev-server');

const getWebpackProdConfig = require('./config/webpack.prod');
const getWebpackDevConfig = require('./config/webpack.dev');
const path = require('path');


export default class Builder {
    constructor(options) {
        this.options = options;
    }
    run() {
        const {
            cwd,
            config = {},
        } = this.options;
        console.log('cwd', cwd);
        const webpackConfig = getWebpackProdConfig({ cwd });
        const complier = webpack(merge(webpackConfig, config));
        complier.run((err, stats) => {
            if (err) {
                console.log(err);
            }
            console.log(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            }));
        });
    }
    start() {
        const { cwd, config = {} } = this.options;
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
}