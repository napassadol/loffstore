'use strict';
angular.module('app').controller('registerCtrl', [ '$rootScope', '$scope', 'registerApi', 
function( $rootScope, $scope, registerApi){
	console.log('registerCtrl');
	var vm = this

	var minimun_len_username = 8
	var maximun_len_username = 10

	if($rootScope.register_type != undefined){
		if($rootScope.register_type == 'farmer'){
			vm.farmer = true
		}
		else{
			vm.farmer = false
		}
		$rootScope.register_type = undefined
	}
	else{
		window.location.href = "/#/register"
	}

	function validataData(){
		var data = vm.register
		var return_data = {}

		return_data.status = true
		
		if(data != undefined){
			if(data.username == undefined){
				return_data.status = false
				return_data.message = 'please enter username'
				return return_data
			}
			else{
				if(data.username.lenght < minimun_len_username || data.username.lenght > maximun_len_username){
					return_data.status = false
					return_data.message = 'username must ' + minimun_len_username.toString() + '-' + maximun_len_username.toString() + ' character'
					return return_data
				}
			}
	
			if(data.password == undefined){
				return_data.status = false
				return_data.message = 'please enter password'
				return return_data
			}
	
			if(data.email == undefined){
				return_data.status = false
				return_data.message = 'please enter email'
				return return_data
			}
			
			if(vm.farmer){
				if(data.first_name == undefined){
					return_data.status = false
					return_data.message = 'please enter first name'
					return return_data
				}
		
				if(data.last_name == undefined){
					return_data.status = false
					return_data.message = 'please enter last name'
					return return_data
				}
			}
			else{
				if(data.factory_name == undefined){
					return_data.status = false
					return_data.message = 'please enter factory name'
					return return_data
				}
			}

			if(data.phone == undefined){
				return_data.status = false
				return_data.message = 'please enter phone number'
				return return_data
			}
		}
		else{
			return_data.status = false
			return_data.message = 'please enter your infomation'
			return return_data
		}

		return return_data

	}
	vm.submit = function(){
		var valid = validataData()
		var data = vm.register
		
		if(valid.status == true){
			registerApi.saveDataRegister(data).then(
				function successCallBack(response){
					response = response.plain()
					if(response.status == "Failed"){
						SweetAlert.swal({
							title : response.message,
							confirmButtonColor : '#007AFF'
						});
					}
					else{
						window.location.href = "/#/login"
					}
				}
			)
		}
		else{
			SweetAlert.swal({
				title : valid.message,
				confirmButtonColor : '#007AFF'
			});
		}
	}

}]);