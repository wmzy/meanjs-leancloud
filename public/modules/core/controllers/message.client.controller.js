'use strict';

angular.module('core').controller('MessageController', function ($scope, Message) {
  $scope.list = Message.list;
  $scope.close = Message.close;
});
