app.controller('productPostCtrl', [ '$rootScope', '$scope', 'productApi', '$http', '$cookieStore',
    function( $rootScope, $scope, productApi, $http, $cookies){
        var vm = this
        var images = []

        vm.data = {}
        vm.select = {}
        vm.select.unit = ['ไร่', 'กิโลกรัม'];
        vm.type = $cookies.get('auth').data.user_type
        vm.data.unit = vm.select.unit[0]
        
        vm.data.image_0 = '/media/image/none/noimage.jpg'
        vm.data.image_1 = '/media/image/none/noimage.jpg'
        vm.data.image_2 = '/media/image/none/noimage.jpg'
        vm.data.image_3 = '/media/image/none/noimage.jpg'
        
        $http.get('/static/locate/changwats/json/th.json').success(function (data){
            vm.city = data.th.changwats
        })
        $http.get('/static/locate/amphoes/json/th.json').success(function (data){
            vm.district = data.th.amphoes
        })
        $http.get('/static/locate/tambons/json/th.json').success(function (data){
            vm.sub_district = data.th.tambons
        })

        vm.submit = function(appForm){
            var post_param = {
                'name' : vm.data.product_name,
                'area' : vm.data.amount,
                'unit' : vm.data.unit,
                'user_id' : $cookies.get('auth').data.id,
                'location' : {
                    'city' : vm.data.city,
                    'district' : vm.data.district,
                    'sub_district' : vm.data.sub_district,
                }
            }
            productApi.postProductSell(post_param).then(
                function(response){
                    console.log(response);
                    if(response.status == 'Failed'){
                        swal({
                            title: "Failed",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
            
                        });
                    }
                    else{
                        swal({
                            title: "Post Success",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false
            
                        });
                        window.location.href = '/#/home'
                    }
                }
            )
        }

        vm.uploadfile = function(files, index) {
            if(files.files.length == 0){
                return
            }
            var fd = new FormData();
            fd.append('file', files.files[0])
            fd.append('index', index)
            fd.append('user_id',  $cookies.get('auth').data.id)
            $http.post('post_sample_image/', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(
                function(response){
                    if(response.status == 200){
                        if(index == 0){
                            vm.data.image_0 = '/media/' + response.data.data
                        }
                        else if(index == 1){
                            vm.data.image_1 = '/media/' + response.data.data
                        }
                        else if(index == 2){
                            vm.data.image_2 = '/media/' + response.data.data
                        }
                        else if(index == 3){
                            vm.data.image_3 = '/media/' + response.data.data
                        }
                    }
                }
            )
        }
    }
])