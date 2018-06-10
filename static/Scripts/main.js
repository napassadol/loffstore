app.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$timeout', '$http', '$cookieStore',
function ($rootScope, $state, $stateParams, $localStorage, $timeout, $http, $cookies) {

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
        })

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
}])