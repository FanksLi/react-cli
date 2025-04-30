const path = require('path');
const NodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/index.js', // 根据实际情况调整输入文件路径
    output: {
        filename: 'index.js', // 根据实际情况调整输出文件名
        path: path.resolve(__dirname, 'lib'), // 根据实际情况调整输出路径
        libraryTarget: 'commonjs', // 使用 CommonJS 格式
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // 可以添加其他插件，例如 HtmlWebpackPlugin, DefinePlugin 等
    ],
    target: 'node',
    externals: [NodeExternals()], // 处理外部依赖

};