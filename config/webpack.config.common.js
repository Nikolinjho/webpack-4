const path = require('path');
const webpack = require('webpack');
require('dotenv').config(); // read and write env vars
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext =>
    isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`;



const webpackConfig = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        main: ['@babel/polyfill', './main.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.png',
            '.jpg',
            '.jpeg',
            '.svg',
            '.gif',
            '.vue',
        ],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    plugins: [
        new UnusedFilesWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "kran", без template
            template: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({}),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new DuplicatePackageCheckerPlugin({
            verbose: true,
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'md4',
            hashDigest: 'base64',
            hashDigestLength: 8,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        

        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src/images"),
        //             to: path.resolve(__dirname, "dist/images")
        //         }
        //     ]
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                test: /\.css$/,
                use: [
                    isProd
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader.toString(),

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                            config: {
                                path: './postcss.config.js',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|jpeg|svg|gif|)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                            context: 'images',
                            esModule: false,
                        },
                    },
                    // 'url-loader?limit=8192',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff2|woff|ttf|eot )$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[path][name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
            {
                test: /\.xml$/,
                use: [{ loader: 'xml-loader' }],
            },
            {
                test: /\.csv$/,
                use: ['csv-loader'],
            },
        ],
    },
};

module.exports = webpackConfig;
