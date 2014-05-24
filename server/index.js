'use strict';

var compress = require('compression');
var express = require('express');
var setupAssets = require('./setup/assets');
var app = module.exports = express();

// Add middleware
app.use(compress());
setupAssets(app);
