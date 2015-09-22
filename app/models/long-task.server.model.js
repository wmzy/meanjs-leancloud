'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var winston = require('winston');
var AV = require('leanengine');
var Base = require('../lib/base-model');

var LongTask = Base.extend('LongTask', {
  done: function (result) {
    this.set('result', JSON.stringify(result));
    this.set('state', 'done');

    return this.save();
  },
  error: function (err) {
    this.set('state', 'fail');
    this.set('error', err);

    return this.save();
  },
  progress: function (value, max) {
    this.set('progressValue', value);
    if (max) this.set('progressMax', max);
    return this.save(); // todo: 优化根据timeout定时保存
  },
  checkTimeout: function () {
    if (this.get('state') === 'started' && Date.now() - this.updatedAt > this.get('timeout')) {
      this.error(new Error('timeout'));
    }
  },
  _logger: winston.loggers.get('longTask'),
  log: function (message, meta) {
    meta = meta || {};
    meta.taskId = this.id;
    this._logger.info(message, meta);
  },
  logs: function (callback) {
    var self = this;
    var options = {
      from: Date.now() - 20 * 60 * 1000,
      until: new Date(),
      limit: 1000,
      start: 0,
      order: 'desc',
      fields: ['taskId', 'message', 'timestamp']
    };
    self._logger.query(options, function (err, logs) {
      if (err) return callback(err);

      var id = self.id;
      callback(null, (logs.file || []).filter(function (log) {
        return log.taskId === id;
      }));
    });
  }
});

/**
 * 创建一个执行长任务的路由处理函数。
 * @param taskFn
 * @param options
 * @returns {Function}
 */
LongTask.globalLock = function (taskFn, options) {
  return function (req, res, next) {
    options = options || {};

    var validate = options.validate;
    if (typeof validate === 'function') {
      var err = validate(req, res);
      if (err) return next(err);
    }

    var timeout = options.timeout || 10 * 60 * 1000;
    if (typeof options.getName === 'function') options.name = options.getName(req);
    var name = options.name || _.keys(req.route.methods).join('-') + ' ' + req.route.path;

    var task = new LongTask({
      name: name,
      state: 'started',
      timeout: timeout
    });

    task.save().then(function () {
      var query = LongTask.query();

      query.equalTo('name', name);
      query.equalTo('state', 'started');
      query.greaterThan('createdAt', new Date(Date.now() - process.uptime() * 1000));
      query.ascending('createdAt');

      return query.first();
    }).then(function (t) {
      t.checkTimeout();

      if (task.id !== t.id && t.get('state') === 'started') {
        task.destroy();
        task = t;
      } else {
        taskFn(task, req);
      }

      res.status(202).json(task);
    }, function (err) {
      next(err);
    });
  };
};

// todo: 关闭进程启动前的任务

exports = module.exports = LongTask;
