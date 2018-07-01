'use strict';
angular.module('app').controller('registerSelectCtrl', [ '$rootScope', '$scope', 'registerApi', '$location', 'facebookService', '$cookieStore',
function($rootScope, $scope, registerApi, $location, facebookService, cookies){
	var vm = this

	vm.farmerRegis = function(){
		if($location.search().id != undefined){
			facebookService.getStatus().then(
				function(response) {
					if(response.status == 'connected'){
						facebookService.getInfo().then(
							function(response){
								console.log(response);
								var parameter = {
									'username' : response.id,
									'first_name': response.first_name,
									'last_name': response.last_name,
									'email': response.email == undefined ? '' : response.email,
									'user_type': 'Farmer'
								}
								registerApi.saveDataRegisterFB(parameter).then(
									function(response){
										if(response.status == "Success"){
											cookies.put('auth', response)
											window.location.href = "/"
										}
									}
								)
							}
						)
					}
				}
			)
		}
		else{
			$rootScope.register_type = 'farmer'
			window.location.href = '/#/register/detail'
		}
	}

	vm.factoryRegis = function(){
		if($location.search().id != undefined){
			if($location.search().id != undefined){
				facebookService.getStatus().then(
					function(response) {
						if(response.status == 'connected'){
							facebookService.getInfo().then(
								function(response){
									console.log(response);
									var parameter = {
										'username' : response.id,
										'first_name': response.first_name,
										'last_name': response.last_name,
										'email': response.email == undefined ? '' : response.email,
										'user_type': 'Factory'
									}
									registerApi.saveDataRegisterFB(parameter).then(
										function(response){
											if(response.status == "Success"){
												cookies.put('auth', response)
												window.location.href = "/"
											}
										}
									)
								}
							)
						}
					}
				)
			}
		}
		else
		{
			$rootScope.register_type = 'factory'
			window.location.href = '/#/register/detail'
		}
	}
}]);