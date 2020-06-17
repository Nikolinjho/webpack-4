'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJSPlugin           = require('uglifyjs-webpack-plugin');
// const CompressionPlugin        = require('compression-webpack-plugin');

const commonConfig = require('./webpack.config.common');


const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = merge(commonConfig, {
    mode: 'production',
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorPluginOptions: {
                    preset:
                        [
                            'default',
                            {
                                discardComments:
                                {
                                    removeAll: true
                                }
                            }
                        ],
                }
            }),
            new TerserWebpackPlugin({
                sourceMap: !isProd,
                cache: true,
                parallel: true,
            }),
        ],
    },
    plugins: [

        // new webpack.HashedModuleIdsPlugin()
    ]
});

if (!isProd) {
    webpackConfig.devtool = 'source-map';

    if (process.env.npm_config_report) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
    }
}

module.exports = webpackConfig;
