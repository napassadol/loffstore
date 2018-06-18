app.controller('productDetailCtrl', [ '$rootScope', '$scope', 'productApi', '$http', '$cookieStore', '$location',
    function( $rootScope, $scope, productApi, $http, $cookies, $location){
        var vm = this
        vm.image = []

        if($location.search().id != undefined){
            vm.product_id = $location.search().id
            vm.data = $rootScope.product
            getProductInfo(vm.product_id)
        }
        else{
            window.location.href = '/#/home'
        }

        function getUserInfo(id){
            productApi.getUserInfo({'id': parseInt(id)}).then(
                function successCallBack(response){
                    response = response.plain()
                    vm.user = response.data
                    vm.image.push(vm.data.product_img_0)
                    vm.image.push(vm.data.product_img_1)
                    vm.image.push(vm.data.product_img_2)
                    vm.image.push(vm.data.product_img_3)
                }
            )
        }

        function getProductInfo(id){
            productApi.getProductInfo({'id':parseInt(id)}).then(
                function successCallBack(response){
                    response = response.plain()
                    vm.data = response.data
                    getUserInfo(vm.data.user_id)
                }
            )
        }
    }
])