app.controller('registerDetailCtrl', [ '$rootScope', '$scope', 'registerDetailApi', '$cookieStore', '$http',
    function( $rootScope, $scope, registerDetailApi, $cookies, $http){
        var vm = this
        vm.register = {}

        $http.get('/static/locate/changwats/json/th.json').success(function (data){
            vm.city = data.th.changwats
        })
        $http.get('/static/locate/amphoes/json/th.json').success(function (data){
            vm.district = data.th.amphoes
        })
        $http.get('/static/locate/tambons/json/th.json').success(function (data){
            vm.sub_district = data.th.tambons
        })

        registerDetailApi.getUserData({'id': $cookies.get('auth').data.id}).then(
            function successCallBack(response){
                vm.register = response.data
                console.log(vm.register);
            }
        )

        vm.uploadfile = function(files, index) {
            if(files.files.length == 0){
                return
            }
            var fd = new FormData();
            fd.append('file', files.files[0])
            fd.append('index', index)
            fd.append('user_id',  $cookies.get('auth').data.id)
            $http.post('post_user_image/', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(
                function(response){
                    if(response.status == 200){
                        if(index == 0){
                            vm.register.prop_img_0 = response.data.data
                        }
                        else if(index == 1){
                            vm.register.prop_img_1 = response.data.data
                        }
                        else if(index == 2){
                            vm.register.prop_img_2 = response.data.data
                        }
                        else if(index == 3){
                            vm.register.prop_img_3 = response.data.data
                        }
                        else if(index == 4){
                            vm.register.user_img = response.data.data
                        }
                    }
                }
            )
        }

        vm.submit = function(appForm){
            vm.register.id = $cookies.get('auth').data.id
            vm.register.address.city = vm.register.address.city.name
            vm.register.address.district = vm.register.address.district.name
            vm.register.address.sub_district = vm.register.address.sub_district.name
            registerDetailApi.addInformation(vm.register).then(
                function successCallBack(response){
                    if(response.status == 'Success'){
                        $cookies.put('auth', response.plain())
                        swal({
                            title: "Success",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false,
                            type: 'success'
                        })
                        window.location.href = '/#/home'
                    }
                    else{
                        swal({
                            title: "Fail",
                            timer: 1200,
                            showCancelButton: false,
                            showConfirmButton: false,
                            type: 'error'
                        })
                    }
                }
            )
        }
    }
])