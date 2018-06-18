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

        if($cookies.get('auth').data.verify == false){
            swal({
                title: 'Warinig',
                text: "Require more information before post",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Fill more infoemation'
              }).then((result) => {
                if (result.value) {
                    window.location.href = '/#/register/extend'
                }
                else{
                    window.location.href = '/#/home'
                }
              })
        }
        
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
                'price' : vm.data.price,
                'user_id' : $cookies.get('auth').data.id,
                'description': vm.data.description,
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
    }
])