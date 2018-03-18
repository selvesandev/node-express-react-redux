import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin'

import path from 'path';

const env = process.env.NODE_ENV;


export default {
    mode: env || 'development',
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                use: 'babel-loader'
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                },
                    {
                        loader: "css-loader", options: {
                        sourceMap: true
                    }
                    },
                    {
                        loader: "sass-loader", options: {
                        sourceMap: true
                    }
                    }]
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'views/index.html'
        // })
    ]
}