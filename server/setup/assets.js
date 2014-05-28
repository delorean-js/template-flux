'use strict';

var config = require('../../webpack.config');
var express = require('express');
var path = require('path');

var rootPath = path.join(__dirname, '../..');
var projects = process.env.project || Object.keys(config.entry);
var singleProject = projects.length === 1;
var basePath = path.join(rootPath, 'build', singleProject ? projects[0] : '');

if(typeof projects === 'string') {
  projects = projects.split(',');
}

module.exports = function(app) {
  var indexFile;

  app.use(express.static(basePath));

  if(singleProject) {
    indexFile = path.join(basePath, 'index.html');
    app.get('*', function(request, response) {
      response.sendfile(indexFile);
    });
  }
  else {
    projects.forEach(function(project) {
      var indexFile = path.join(basePath, project, 'index.html');
      app.get('/' + project + '/*', function(request, response) {
        response.sendfile(indexFile);
      });
    });
  }
};
