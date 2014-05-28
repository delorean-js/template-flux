'use strict';

var app = require('./app');
var http = require('http');

module.exports = http.createServer(app);
