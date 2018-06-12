'use strict';
angular.module('app').controller('loginCtrl', [ '$rootScope', '$scope', 'loginApi', 'SweetAlert', '$cookieStore',
	function($rootScope, $scope, loginApi, SweetAlert, cookies){
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
							SweetAlert.swal("login fail")
						}
					}
				)
			}
		}
	}
]);