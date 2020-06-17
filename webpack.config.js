'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
    module.exports = require('./webpack.config.development.js');
} else {
    module.exports = require('./webpack.config.production');
}
