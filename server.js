'use strict';
/**
 * Module dependencies.
 */
console.time('start time');

require('./config/init')();
var config = require('./config/config');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('app started on port ' + config.port);

// 开发时打印浏览器启动链接
if (process.env.NODE_ENV === 'development') {
  console.log('http://localhost:' + config.port);
}

console.timeEnd('start time');
