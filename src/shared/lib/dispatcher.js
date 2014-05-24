'use strict';

var Rx = require('rx');
var subject = new Rx.Subject();
var dispatcher = module.exports = subject.asObservable();

dispatcher.dispatch = function(store, action, argument) {
  var split = store.split('#');

  if(split.length > 1) {
    argument = action;
    store = split[0];
    action = split.slice(1).join('#');
  }
  subject.onNext({
    store: store,
    action: action,
    argument: argument
  });
};

dispatcher.ofStore = function(store) {
  var observable = dispatcher.filter(function(message) {
    return message.store === store;
  });

  observable.ofAction = function(action) {
    return observable.filter(function(message) {
      return message.action === action;
    })
    .map(function(message) {
      return message.argument;
    });
  };

  return observable;
};
