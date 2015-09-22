'use strict';

exports._models = {};

exports.model = function (name) {
  if (!this._models[name]) {
    try {
      this._models[name] = require('../models/' + name.replace(/(?!^.)([A-Z])/g, '-$1').toLowerCase() + '.server.model');
    } catch (e) {}
  }

  return this._models[name];
};
