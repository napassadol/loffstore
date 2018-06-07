'use strict';
angular.module('app').controller('loginCtrl', [ '$rootScope', '$scope', 'loginApi', 'SweetAlert', 
	function($rootScope, $scope, loginApi, SweetAlert){
		var vm = this

		vm.submit = function(loginForm){
			if(loginForm.$valid){
				var request_data = {
					'username' : vm.login.username,
					'password' : vm.login.password
				}
				loginApi.login(request_data).then(
					function successCallBack(response){
						response = response.plain()
						if(response.status == 'Success'){
							$rootScope.auth = 

							window.location.href = "/"
						}
						else{
							SweetAlert.swal("login fail")
						}
					}
				)
			}
		}
	}
]);