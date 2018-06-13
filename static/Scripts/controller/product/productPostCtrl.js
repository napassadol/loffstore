app.controller('productPostCtrl', [ '$rootScope', '$scope', 'productPostApi', 'SweetAlert', 
    function( $rootScope, $scope, productPostApi, SweetAlert){
        var vm = this
        vm.data = {}
        vm.select = {}
        vm.select.unit_area = ['a', 'b']
    }
])