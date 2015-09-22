'use strict';

angular.module('core').filter('gender',
  function () {
    return function (input) {
      var map = {
        1: '男',
        2: '女'
      };

      return input ? map[input] : '';
    };
  }
);
