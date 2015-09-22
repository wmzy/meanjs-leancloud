'use strict';

module.exports = function(app) {
  var router = require('express').Router();
  var users = require('../controllers/users.server.controller');
  var longTasks = require('../controllers/long-tasks.server.controller');

  router.use(users.requiresLogin);

  router.get('/logs/:longTaskId', longTasks.logs);

  router.route('/:longTaskId')
    .get(longTasks.read);

  // Finish by binding the populate middleware
  router.param('longTaskId', longTasks.populateById);
  app.use('/long-tasks', router);
};
