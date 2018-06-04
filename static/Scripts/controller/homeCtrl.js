'use strict';
angular.module('app').controller('homeCtrl', [ '$scope', '$http', 'homeApi', 
function($scope, $http, homeApi){
	console.log('homeCtrl');
	var vm = this
	// $http.get("test/").then(function(output) 
	// {
	// 	// $scope.testUser = output;
	// 	console.log(output);
	// });
	homeApi.test().then(
		function(response){
			console.log(response)
		}
	)
}]);