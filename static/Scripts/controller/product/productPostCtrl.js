app.controller('productPostCtrl', [ '$rootScope', '$scope', 'productApi', 'SweetAlert', '$http', '$cookieStore',
    function( $rootScope, $scope, productApi, SweetAlert, $http, $cookies){
        var vm = this
        var images = []

        vm.data = {}


        vm.select = {}
        vm.select.unit = ['ไร่', 'กิโลกรัม'];
        
        $http.get('/static/locate/changwats/json/th.json').success(function (data){
            vm.locate_data = data.th.changwats
            console.log(vm.locate_data);
        })

        vm.type = $cookies.get('auth').data.user_type

        vm.data.unit = vm.select.unit[0]
        vm.submit = function(appForm){
            var fd = new FormData();
            fd.append("file", images);
            // $http.post('post_product_sell/', fd, {
            //     withCredentials: true,
            //     headers: {'Content-Type': undefined },
            //     transformRequest: angular.identity
            // })
        }

        vm.uploadfile = function(files, index) {
            var fd = new FormData();
            fd.append("file", images);
            $http.post('post_product_sell/', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            })
        }
    }
])