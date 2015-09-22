'use strict';

angular.module('long-tasks').factory('LongTask',
	function($resource) {
    return $resource('long-tasks/:longTaskId', { longTaskId: '@objectId'});
	}
);
