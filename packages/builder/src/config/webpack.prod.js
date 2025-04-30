

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');



module.exports = function getWebpackProdConfig(options) {
    const {cwd} = options;
    const config = baseConfig({
        isDev: false,
        cwd,
    });
    return merge(config, {
        mode: 'production',
        devtool: 'source-map',
        optimization: {
            minimize: true,
            splitChunks: { 
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
             },
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        compress: true,
                        mangle: true,
                        format: {
                            comments: false,
                        },
                        mangle: true,
                    }
                }),
                new CssMinimizerPlugin({
                    parallel: true,
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {
                                    removeAll: true,
                                },
                                discardComments: true,
                                colormin: true,
                            },
                        ],
                    },
                }),
            ],
        },
    });
};