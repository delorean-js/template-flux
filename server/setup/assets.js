'use strict';

var config = require('../../webpack.config');
var express = require('express');
var path = require('path');

var pushState = true;
var rootPath = path.join(__dirname, '../..');
var projects = process.env.project
  ? process.env.project.split(',')
  : Object.keys(config.entry);
var singleProject = projects.length === 1;
var basePath = path.join(rootPath, 'build', singleProject ? projects[0] : '');

module.exports = function(app) {
  var indexFile;
  var indexJs;
  var rootPage;

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
      rootPage = projects.map(function(project) {
        return '<div><a href="/' + project + '">' + project + '</a></div>';
      }).join('');
      app.get('/', function(request, response) {
        response.send(rootPage);
      });
      projects.forEach(function(project) {
        var indexFile = path.join(basePath, project, 'index.html');
        app.get('/' + project + '/*', function(request, response) {
          response.sendfile(indexFile);
        });
      });
    }
  }
};
