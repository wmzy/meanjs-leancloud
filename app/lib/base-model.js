'use strict';

/**
 * Module dependencies.
 */
var AV = require('leanengine');

exports = module.exports = AV.Object.extend('', {}, {
  getById: function (id) {
    var query = new AV.Query(this);
    return query.get(id);
  },
  query: function () {
    return new AV.Query(this);
  }
});

