const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: [/node_modules/, /coverage/],
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        stats: {
            colors: true,
            modules: false,
            chunks: false,
            children: false,
            chunkModules: false
        },
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 200,
            poll: 500
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HiReact'
        })
    ],
    optimization: {
        minimize: false
    },
    mode: "development"
}