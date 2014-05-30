'use strict';

var config = require('../../webpack.config');
var express = require('express');
var path = require('path');

var pushState = true;
var rootPath = path.join(__dirname, '../..');
var projects = process.env.project || Object.keys(config.entry);
var singleProject = projects.length === 1;
var basePath = path.join(rootPath, 'build', singleProject ? projects[0] : '');

if(typeof projects === 'string') {
  projects = projects.split(',');
}

module.exports = function(app) {
  var indexFile;
  var indexJs;

  app.use(express.static(basePath));

  if(pushState) {
    if(singleProject) {
      indexFile = path.join(basePath, 'index.html');
      indexJs = path.join(basePath, 'index.js');
      app.get('/' + projects[0] + '/index.js', function(request, response) {
        response.sendfile(indexJs);
      });
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
  }
};
