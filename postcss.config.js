const postcssNested = require('postcss-nested');
const postcssNestedAncestors = require('postcss-nested-ancestors');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
// const postcssInlineSVG = require('postcss-inline-svg');
const postcssCurrentSelector = require('postcss-current-selector');
const postcssCustomMedia = require('postcss-custom-media');
const postcssExtend = require('postcss-extend-rule');
const postcssMixins = require('postcss-mixins');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        autoprefixer(),
        // cssnano(),
        postcssImport(),
        postcssExtend(),
        postcssMixins(),
        postcssNestedAncestors(),
        postcssNested(),
        postcssCurrentSelector(),
        postcssCustomMedia(),
        postcssPresetEnv(),
    ]
};