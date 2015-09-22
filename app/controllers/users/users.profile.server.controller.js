'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Update user details
 */
exports.update = function(req, res, next) {
	// Init Variables
	var user = req.user;

	if (user) {
		// Merge existing user
		user = _.extend(user.attributes, req.body);

    user.save().then(function () {
      res.json(user);
    }, function (err) {
      next(err);
    });
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
