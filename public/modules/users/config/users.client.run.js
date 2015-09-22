'use strict';

// Setting up route
angular.module('users').run(function ($rootScope, $state, Authentication) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (Authentication.user || ~['signin', 'signup'].indexOf(toState.name)) return;

    event.preventDefault();
    Authentication.refused = {
      state: toState,
      params: toParams
    };
    $state.go('signin');
  });
});
