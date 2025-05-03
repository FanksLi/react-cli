
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const getWebpackProdConfig = require('../config/webpack.prod');


module.exports = function build(options = {}) {
    
    const {
        cwd,
        config = {},
    } = options;
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