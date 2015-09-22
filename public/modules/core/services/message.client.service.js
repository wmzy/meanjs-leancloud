'use strict';

angular.module('core').factory('Message', function () {
  // Message service logic
  // ...

  // Public API
  return {
    list: [],
    close: function (index) {
      this.list.splice(index, 1);
    },
    info: function (msg) {
      this.list.push({type: 'info', msg: msg});
    },
    success: function (msg) {
      this.list.push({type: 'success', msg: msg});
    },
    error: function (msg) {
      this.list.push({type: 'danger', msg: msg});
    }
  };
});
