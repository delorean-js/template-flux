'use strict';

var page = require('page');
var fileProtocol = location.protocol === 'file:';
var helpers = {};
var slice = Array.prototype.slice;

var router = module.exports = {
  on: function(helper, path) {
    var helperIncluded = typeof path === 'string';

    page.apply(null, slice.call(arguments, helperIncluded ? 1 : 0));
    if(helperIncluded) {
      helpers[helper] = path;
    }
  },
  navigate: function(path) {
    page.show(helpers[path] ? router.url.apply(null, arguments) : path);
  },
  url: function(helper, params) {
    var path = helpers[helper];

    for(var key in params) {
      path = path.replace('/:' + key, '/' + params[key]);
    }

    if(!~path.indexOf(':')) {
      // TODO: Throw error
    }

    return path;
  },
  start: function() {
    page.start({dispatch: !fileProtocol});
    if(fileProtocol) {
      stripPushState();
      page.show('/');
    }
  }
};

function stripPushState() {
  window.page = page;
  history.pushState = history.pushState = function() {};
}
