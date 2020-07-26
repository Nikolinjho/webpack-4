const path = require("path");
const webpack = require('webpack');
require('dotenv').config(); // 
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");


const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev;


const filename = ext => isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`

const webpackConfig = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        main: ["@babel/polyfill", "./index.js"],
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".json", ".png", ".jpg", ".jpeg", ".svg", ".gif", '.vue',],
        alias: {
            "@models": path.resolve(__dirname, "../src/models"),
            "@": path.resolve(__dirname, "../src/"),
        }
    },
    plugins: [
        new UnusedFilesWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "kran", без template
            template: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        // new VueLoaderPlugin(),
        new CleanWebpackPlugin({
        }),
        new MiniCssExtractPlugin({
            filename: filename("css")
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
        //         // {
        //         //     from: path.resolve(__dirname, "/../../src/favicon.ico"),
        //         //     to: path.resolve(__dirname, "dist")
        //         // }
        //     ]
        // }),

    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]

                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            },
                            sourceMap: true
                        },
                    },

                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif|)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "images",
                            context: 'images'
                        },

                    },
                    // 'url-loader?limit=8192',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(woff2|woff|ttf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "fonts"
                        }
                    }
                ]
            },
            {
                test: /\.xml$/,
                use: [{ loader: "xml-loader" }]
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"]
            }
        ]
    }
}

module.exports = webpackConfig;