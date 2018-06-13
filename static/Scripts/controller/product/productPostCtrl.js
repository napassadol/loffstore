app.controller('productPostCtrl', [ '$rootScope', '$scope', 'productPostApi', 'SweetAlert', 
    function( $rootScope, $scope, productPostApi, SweetAlert){
        var vm = this
        vm.data = {}
        vm.select = {}
        vm.select.unit = ['ไร่', 'กิโลกรัม'];

        vm.data.unit = vm.select.unit[0]
        vm.submit = function(){

        }
    }
])