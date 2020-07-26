'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
    module.exports = require('./config/webpack.config.development.js');
} else {
    module.exports = require('./config/webpack.config.production');
}
