'use strict';

/**
 * Module dependencies.
 */
var AV = require('leanengine');

/**
 * Signup
 */
exports.signup = function(req, res, next) {
  var user = new AV.User(req.body);
  user.set('salt', Date.now().toString());
  user.signUp().then(function () {
    user.unset('password');
    user.unset('salt');

    res.json(user);
  }, function (err) {
    return next(err);
  });
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
  AV.User.logIn(req.body.username, req.body.password).then(function (user) {
    var city = user.get('city');
    if (city) return city.fetch().then(function () {
      user.set('city', city.get('cityName'));
      res.json(user);
    });
    res.json(user);
  }, function (err) {
    next(err);
  });
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	AV.User.logOut();
	res.redirect('/');
};

