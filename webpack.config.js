'use strict';

var fs = require('fs');
var path = require('path');
var paths = {
  bower:    relativeToProject('bower_components'),
  modules:  relativeToProject('node_modules'),
  output:   relativeToProject('build'),
  shared:   relativeToProject('src/shared'),
  source:   relativeToProject('src')
};

module.exports = {
  context: paths.source,
  entry: entries(),
  resolve: {
    root: paths.source,
    modulesDirectories: [paths.modules, paths.bower, paths.shared],
    alias: {
      rx: 'rx/dist/rx.lite.compat.js',
      'rx-testing': 'rx/dist/rx.testing.js'
    }
  },
  output: {
    path: paths.output,
    filename: '[name]/index.js'
  },
  module: {
    loaders: [
      {test: /\.(?:eot|svg|ttf|woff)$/, loader: 'url'},
      {test: /\.js$/, loader: 'jsx'},
      {test: /\.less$/, loader: 'style!css!autoprefixer!less'},
    ]
  }
};

function relativeToProject(relativePath) {
  return path.join(__dirname, relativePath);
}

function entries() {
  return fs
  .readdirSync(paths.source)
  .filter(function(fileOrDir) {
    if(fileOrDir !== 'shared') {
      return fs.statSync(path.join(paths.source, fileOrDir)).isDirectory();
    }
    return false;
  })
  .reduce(function(obj, project) {
    obj[project] = project;
    return obj;
  }, {});
}
