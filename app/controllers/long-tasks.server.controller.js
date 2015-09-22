'use strict';

/**
 * Module dependencies.
 */
var AV = require('leanengine');
var modelHelper = require('../lib/model-helper');
var LongTask = modelHelper.model('LongTask');
var _ = require('lodash');

/**
 * Show the current LongTask
 */
exports.read = function(req, res) {
  req.longTask.checkTimeout();
  res.json(req.longTask);
};

/**
 * Show the logs of LongTask
 */
exports.logs = function(req, res, next) {
  req.longTask.logs(function (err, logs) {
    if (err) return next(err);

    res.json(logs);
  });
};

/**
 * WageStrategy middleware
 */
exports.populateById = function (req, res, next, id) {
  LongTask.getById(id).then(function (longTask) {
    if (!longTask) return next(new Error('Failed to load Task: ' + id));
    req.longTask = longTask;
    next();
  }, function (err) {
    next(err);
  });
};
