'use strict';

var winston = require('winston');
var os = require('os');
var path = require('path');
var mkdirp = require('mkdirp');

var logDir = path.join(os.tmpdir(), 'meanjs-leancloud', 'logs');

try {
  mkdirp.sync(logDir);
} catch (e) {
  console.error(e);
}

if (process.env.NODE_ENV === 'production') {
  var logFile = path.join(logDir, 'info.log');
  winston.add(winston.transports.File, {
    filename: logFile,
    maxsize: 4 * 1024 * 1024,  // 4m
    maxFiles: 100
  });
} else {
  winston.default.transports.console.level = 'silly';
}

// long task log
var longTaskLogFile = path.join(logDir, 'long-task.log');
winston.loggers.add('longTask').add(winston.transports.File, {
  name: 'file',
  filename: longTaskLogFile,
  maxsize: 4 * 1024 * 1024,  // 4m
  maxFiles: 100
}).remove(winston.transports.Console);
