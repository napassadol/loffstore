'use strict';
angular.module('app').controller('loginCtrl', [ '$rootScope', '$scope', 'loginApi', '$cookieStore', 'facebookService',
	function($rootScope, $scope, loginApi, cookies, facebookService){
		var vm = this
		vm.show_login = false

		vm.FBlogout = function(){
			facebookService.logout().then(
				function(response) {
					console.log("logout")
				}
			)
		}

		vm.FBlogin = function(){
			facebookService.login().then(
				function(response){
					if(response.status == 'connected'){
						var request_data = {
							'username' : response.authResponse.userID,
							'facebook' : true
						}
						loginApi.login(request_data).then(
							function successCallBack(response){
								response = response.plain()
								if(response.status == 'Success'){
									cookies.put('auth', response)
									window.location.href = "/"
								}
								else{
									window.location.href = "/#/register?id=" + request_data.username
								}
							}
						)
					}
				}
			)
		}

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