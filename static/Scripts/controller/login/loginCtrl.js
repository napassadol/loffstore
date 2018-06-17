'use strict';
angular.module('app').controller('loginCtrl', [ '$rootScope', '$scope', 'loginApi', '$cookieStore',
	function($rootScope, $scope, loginApi, cookies){
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
							cookies.put('auth', response)
							window.location.href = "/"
						}
						else{
							swal({
								title: "Login Failed",
								timer: 1200,
								showCancelButton: false,
								showConfirmButton: false
				
							});
						}
					}
				)
			}
		}
	}
]);