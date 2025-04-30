const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');



module.exports = (isDev) => {

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name].[fullhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            }
                        },
                        'postcss-loader',
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'static/img/[name].[ext]',
                                type: 'asset',
                                generator: {
                                    filename: 'static/img/[name].[hash:8].[ext]' 
                                },
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias:  {
                '@': path.resolve(__dirname, 'src'),
            },
            extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                inject: 'body',
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[fullhash:8].css',
                chunkFilename: 'static/css/[name].[fullhash:8].css',
            }),
            new Webpack.ProvidePlugin({
                React: 'react',
            }),
        ],
    }
}