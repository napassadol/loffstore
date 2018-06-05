'use strict';
angular.module('app').controller('homeCtrl', [ '$scope', 'homeApi', 
function($scope, homeApi){
	console.log('homeCtrl');
	var vm = this
	homeApi.test().then(
		function(response){
			console.log(response)
		}
	)
}]);