'use strict';

/**
 * Module dependencies.
 */
exports.index = function (req, res, next) {
  if (!req.user) {
    return res.render('index', {
      user: null,
      request: req
    });
  }

  req.user.fetch().then(function () {
    var city = req.user.get('city');
    if (city) {
      return city.fetch().then(function () {
        req.user.set('city', city.get('cityName'));
      });
    }
  }).then(function () {
    res.render('index', {
      user: req.user || null,
      request: req
    });
  }, function (err) {
    return next(err);
  });
};
