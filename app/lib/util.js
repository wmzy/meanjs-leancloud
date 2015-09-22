'use strict';

var async = require('async');
var AV = require('leanengine');
var moment = require('moment-timezone');
var _ = require('lodash');

/**
 * parse date to term
 *
 * @param date
 * @returns {Number} term
 */
exports.dateToTerm = function (date) {
  var m = moment(date);
  return m.year() * 100 + m.month() + 1;
};

/**
 * term to date.
 *
 * @param {Number} term
 * @return {Date}
 */
exports.termToDate = function (term) {
  var month = term % 100;
  return new Date([(term - month) / 100, month]);
};

/**
 * Return last month number.
 *
 * @param {Number} term
 * @return {Number}
 */
exports.getLastTerm = function (term) {
  var month = term % 100;
  var date = new Date([(term - month) / 100]);
  date.setMonth(month - 2);

  return date.getFullYear() * 100 + date.getMonth() + 1;
};

/**
 * 查询并迭代所有项，每次查询1000条记录.
 * 可以使用Promise或callback
 *
 * @param {AV.Query} query AV.Query
 * @param {Function} iterator
 * @param {Function} [callback] 不提供将返回promise
 * @returns {AV.Promise}
 */
exports.queryEach = function (query, iterator, callback) {
  var count;
  var promise = callback ? undefined : new AV.Promise();
  var skip = 0;
  query.limit(1000);
  query.descending('createdAt');

  async.doWhilst(function (callback) {
    query.find().then(function (iterms) {
      count = iterms.length;
      skip += count;

      async.eachLimit(iterms, 2, function (iterm, cb) {
        if (iterator.length === 2) return iterator(iterm, cb);
        iterator(iterm).then(function () {
          cb();
        }, cb);
      }, function (err) {
        callback(err);
      });
    }, callback);
  }, function () {
    return count === 1000;
  }, function (err) {
    if (callback) return callback(err);

    if (err) return promise.reject(err);

    promise.resolve();
  });

  return promise;
};

/**
 * 查询并删除所有项.
 * ** Note: ** 将忽略query.limit()
 *
 * @param {AV.Query} query AV.Query
 * @returns {AV.Promise}
 */
exports.queryRemove = function (query) {
  var count;
  var promise = new AV.Promise();
  query.select();
  query.limit(700);

  async.doWhilst(function (callback) {
    query.find().then(function (iterms) {
      count = iterms.length;

      return AV.Object.destroyAll(iterms);
    }).then(function () {
      callback();
    }, callback);
  }, function () {
    return count === 700;
  }, function (err) {
    if (err) return promise.reject(err);

    promise.resolve();
  });

  return promise;
};

/**
 * 将backbone model 对象转化为json对象，包含关联的model
 * @param {*} model js对象或数组
 * @returns {*}
 */
exports.toJSONInclude = function toJSONInclude(model) {
  if (_.isArray(model)) return model.map(toJSONInclude);
  if (!(model instanceof AV.Object)) return model;

  var obj = model.toJSON();
  _.forIn(obj, function (val, key) {
    if (_.isArray(val)) {
      return (obj[key] = toJSONInclude(model.get(key)));
    }

    if (_.has(val, '__type')) {
      _.assign(val, toJSONInclude(model.get(key)));
    }
  });

  return obj;
};
