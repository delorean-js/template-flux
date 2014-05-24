'use strict';

var config = require('../../webpack.config');
var express = require('express');
var path = require('path');
var webpack = require('webpack');

var rootPath = path.join(__dirname, '../..');
var projects = (process.env.project || Object.keys(config.entry)).split(',');
var singleProject = projects.length === 1;
var basePath = path.join(rootPath, 'build', singleProject ? projects[0] : '');
var indexFile;

module.exports = function(app) {
  app.use(express.static(basePath));

  if(singleProject) {
    indexFile = path.join(basePath, 'index.html');
    app.get('*', function(request, response) {
      response.sendFile(indexFile);
    });
  }
  else {
    projects.forEach(function(project) {
      var indexFile = path.join(basePath, project, 'index.html');
      app.get('/' + project + '/*', function(request, response) {
        response.sendFile(indexFile);
      });
    });
  }
  // RUN WEBPACK
  webpack(config).watch(200, makeCallback({watch: true}));
};
