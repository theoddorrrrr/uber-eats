const path = require('path');
const HTMLWebpackPlugin  = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const babelOptions = () => {
    const opts = {
        presets: [
            '@babel/preset-env',
            ],
    }

    return opts;
}

module.exports = { 
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index-bundle.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'src'),
          },
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(s[ac]ss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }, 
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource',
            },  
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions(),
                }
            }
        ]
    },
}