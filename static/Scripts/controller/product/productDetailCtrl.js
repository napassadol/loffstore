app.controller('productDetailCtrl', [ '$rootScope', '$scope', 'productApi', '$http', '$cookieStore',
    function( $rootScope, $scope, productApi, $http, $cookies){
        var vm = this
        vm.image = []

        if($rootScope.product != undefined){
            vm.data = $rootScope.product
            $rootScope.product = undefined
            getUserInfo()
        }
        else{
            window.location.href = '/#/home'
        }

        function getUserInfo(){
            productApi.getUserInfo({'id': vm.data.user_id}).then(
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
    }
])