'use strict';

/**
 * Module dependencies.
 */
var AV = require('leanengine');

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function(req, res, next) {
  AV.User.requestPasswordReset(req.body.email).then(function () {
    res.send(200);
  }, function (err) {
    next(err);
  });
};

/**
 * Change Password
 */
exports.changePassword = function(req, res, next) {
	// Init Variables
	var passwordDetails = req.body;

	if (req.user) {
		if (passwordDetails.newPassword) {
      req.user.updatePassword(passwordDetails.currentPassword, passwordDetails.newPassword).then(function () {
        res.send(200);
      }, function (err) {
        next(err);
      });
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};
