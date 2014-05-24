'use strict';

var path = require('path');

module.exports = function(config) {
  config.set({
    autoWatch: true,
    frameworks: ['mocha', 'chai', 'detectBrowsers'],
    files: ['src/**/*_test.js']
  });
};
