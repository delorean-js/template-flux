'use strict';

var page = require('page');
var fileProtocol = location.protocol === 'file:';
var helpers = {};
var pushState = true;
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
      throw new Error('Invalid parameters for the "' + helper + '" helper');
    }

    return path;
  },
  start: function() {
    page.start({dispatch: pushState && !fileProtocol});
    if(!pushState || fileProtocol) {
      stripPushState();
      page.show('/');
    }
  }
};

function stripPushState() {
  history.pushState = history.replaceState = function() {};
}
