'use strict';

angular.module('users').controller('AuthenticationController',
  function ($scope, $http, $state, Authentication, Message) {
    $scope.authentication = Authentication;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) $state.go('home');

    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the index page
        $state.go(Authentication.refused.state, Authentication.refused.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the index page
        if (Authentication.refused) {
          return $state.go(Authentication.refused.state, Authentication.refused.params);
        }
        $state.go('home');
      }).error(function (err) {
        Message.error(err.message);
      });
    };
  }
);
