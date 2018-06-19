app.controller('registerDetailCtrl', [ '$rootScope', '$scope', 'registerDetailApi', '$cookieStore', '$http',
    function( $rootScope, $scope, registerDetailApi, $cookies, $http){
        var vm = this
        vm.register = {}

        var image = []

        image[0] = null
        image[1] = null
        image[2] = null
        image[3] = null
        image[4] = null

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
                image[0] = vm.register.
                image[1] = null
                image[2] = null
                image[3] = null
                image[4] = null
            }
        )

        vm.uploadfile = function(files, index) {
            if(files.files.length == 0){
                image[index] = null
                return
            }
            image[index] = files.files[0]
        }

        function validatedata(appForm){
            if(appForm.$invalid == true){
                return {'status' : false, 'message': 'Please fill data all the box'}
            }
            if(image[0] == null && vm.register.user_img == 'image/none/noimage.jpg'){
                return {'status' : false, 'message': 'Please choose user image'}
            }
            return {'status' : true}
        }

        vm.submit = function(appForm){
            ret = validatedata(appForm)
            if(ret.status != true){
                swal({
                    title: ret.message,
                    timer: 1200,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: 'error'
                });
                return
            }
            vm.register.id = $cookies.get('auth').data.id
            registerDetailApi.addInformation(vm.register).then(
                function successCallBack(response){
                    if(response.status == 'Success'){
                        $cookies.put('auth', response.plain())
                        var fd = new FormData();
                        fd.append('file_0', image[0])
                        fd.append('file_1', image[1])
                        fd.append('file_2', image[2])
                        fd.append('file_3', image[3])
                        fd.append('file_4', image[4])
                        fd.append('id', $cookies.get('auth').data.id)
                        $http.post('post_user_image/', fd, {
                            withCredentials: true,
                            headers: {'Content-Type': undefined },
                            transformRequest: angular.identity
                        }).then(
                            function(response){
                                if(response.data.status == "Success"){
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
            )
        }

        function readURL0(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#blah0').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imgInp0").change(function(){
            readURL0(this);
        });
        function readURL1(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#blah1').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $("#imgInp1").change(function(){
            readURL1(this);
        });
        function readURL2(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#blah2').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $("#imgInp2").change(function(){
            readURL2(this);
        });
        function readURL3(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#blah3').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $("#imgInp3").change(function(){
            readURL3(this);
        });
        function readURL4(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#blah4').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $("#imgInp4").change(function(){
            readURL4(this);
        });
    }
])