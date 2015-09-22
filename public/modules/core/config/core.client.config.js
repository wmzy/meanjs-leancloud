'use strict';

// Setting up route
angular.module('core').run(function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function () {
    $rootScope.head.title = '';
  });
});
