'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var AV = require('leanengine');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
  var userQuery = new AV.Query(AV.User);
	userQuery.get(id).then(function(user) {
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (req.user && req.user.authenticated()) {
    return next();
	}

  res.status(401).send({
    message: 'User is not logged in'
  });
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};
