'use strict'
app.controller('homeCtrl', [  '$rootScope', '$scope', 'homeApi', '$http', '$cookieStore', 
	function( $rootScope, $scope, homeApi, $http, $cookies){
		var vm = this
		console.log("home");
		homeApi.getAllProducts().then(
			function(response){
				response = response.plain()
				if(response.status == 'Success'){
					vm.products = response.data
				}
			}
		)

		vm.viewProductDetail = function(product){
			$rootScope.product = product
			window.location.href = '/#/product'
		}
	}
]);