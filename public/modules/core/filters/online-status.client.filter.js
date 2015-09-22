'use strict';

angular.module('core').filter('onlineStatus',
  function () {
    return function (input) {
      var map = {
        0: '上线',
        1: '待上线',
        2: '手动下线',
        3: '离职'
      };

      return input >= 0 && input <= 3 ? map[input] : '';
    };
  }
);
