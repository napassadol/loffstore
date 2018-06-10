'use strict';
angular.module('app').controller('registerSelectCtrl', [ '$rootScope', '$scope', 'registerApi', 'SweetAlert', 
function($rootScope, $scope, registerApi, SweetAlert){
	var vm = this

	vm.farmerRegis = function(){
		$rootScope.register_type = 'farmer'
		window.location.href = '/#/register/detail'
	}

	vm.factoryRegis = function(){
		$rootScope.register_type = 'factory'
		window.location.href = '/#/register/detail'
	}
}]);