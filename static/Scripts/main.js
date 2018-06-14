app.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$timeout', '$http', '$cookieStore',
function ($rootScope, $state, $stateParams, $localStorage, $timeout, $http, $cookies) {
    $rootScope.footer_show = true

    if (!($cookies.get('auth') instanceof Object)) {
        console.log('initial cookies');
        $cookies.put('auth', {});
    }

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            if($cookies.get('auth').status == undefined && toState.name != 'login'){
                if(toState.name != 'register' && toState.name != 'register/detail'){
                    event.preventDefault()
                    $state.go('login')
                }
            }
            else if(toState.name == 'login'){
                if($cookies.get('auth').status == 'Success'){
                    event.preventDefault()
                }
            }
        })
    
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            if(toState.name != 'login' && toState.name != 'register' && toState.name != 'register/detail'){
                $rootScope.footer_show = true
            }
            else{
                $rootScope.footer_show = false
            }
        }
    )

}])

app.factory("user", ['$http', '$cookieStore', function ($http, cookies) {

    var user = {
        username : '',
        id : '',
        init: function () {
            //If cookie not defined then put an empty array
            if (!(cookies.get('auth') instanceof Array)) {
                cookies.put('auth', {});
            }
        },

        get: function () {
            return cookies.get('auth');
        },

        put: function (data){
            cookies.put('auth', data);
        }
    }
}])

app.controller('cookiesCtrl', [ '$rootScope', '$scope', '$cookieStore', '$state',
function($rootScope, $scope, cookies, $state){
    vm = this
    vm.login = true
    vm.farmer = true
    vm.factory = false
    vm.checkCookies = function(){
        data = cookies.get('auth')
        if(data != undefined){
            if(data.status != undefined){
                vm.login = true
            }
            else{
                vm.login = false
            }
        }
        else{
            vm.login = false
        }
    }

    vm.clearCookies = function(){
        cookies.put('auth', {})
        vm.checkCookies()
        window.location.href = '/#/login'
    }

    vm.check_user_type = function(){
        vm.data = cookies.get('auth')
        if(vm.data.user_type == 'farmer'){
            vm.farmer = true
            vm.factory = false
        }
        else if(vm.data.user_type == 'factory'){
            vm.farmer = false
            vm.factory = true
        }
        console.log(vm.data);
    }
}])

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
    
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);