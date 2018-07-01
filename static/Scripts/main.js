app.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$timeout', '$http', '$cookieStore', '$window', '$templateCache',
function ($rootScope, $state, $stateParams, $localStorage, $timeout, $http, $cookies, $window, $templateCache) {
    $rootScope.footer_show = true
    $templateCache.removeAll()

    if (!($cookies.get('auth') instanceof Object)) {
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

    // $window.fbAsyncInit = function() {
    //     FB.init({
    //         appId      : '190074738365427',
    //         cookie     : true,  // enable cookies to allow the server to access 
    //         xfbml      : true,  // parse social plugins on this page
    //         version    : 'v3.0' // use graph api version 2.8
    //     });
    // };

}])
///
app.factory('facebookService', function($q) {
    return {
        getStatus: function() {
            var deferred = $q.defer();
            FB.getLoginStatus(
                function(response){
                    deferred.resolve(response)
                });
            return deferred.promise
        },
        logout: function() {
            var deferred = $q.defer();
            FB.logout(
                function(response){
                    deferred.resolve(response)
                });
            return deferred.promise
        },
        login: function() {
            var deferred = $q.defer();
            FB.login(
                function(response){
                    deferred.resolve(response)
                });
            return deferred.promise
        },
        getInfo: function(){
            var deferred = $q.defer();
            FB.getLoginStatus(
                function(response){
                    if(response.status == "connected"){
                        FB.api('/me', {
                            fields: ['id','last_name','first_name', 'email', 'picture']
                        }, 
                            function(response) {
                                deferred.resolve(response)
                            }
                        )
                    }
                    else{
                        deferred.resolve({'status' : false})
                    }

                }
            );
            return deferred.promise
        },
        test: function(){
            var deferred = $q.defer();
            FB.getLoginStatus(
                function(response){
                    if(response.status == "connected"){
                        FB.api('/' + response.authResponse.userID, {
                            fields: ['id','last_name','first_name', 'email', 'picture']
                        }, 
                            function(response) {
                                deferred.resolve(response)
                            }
                        )
                    }
                    else{
                        deferred.resolve({'status' : false})
                    }

                }
            );
            return deferred.promise
        }
    }
});


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

app.controller('cookiesCtrl', [ '$rootScope', '$scope', '$cookieStore', '$state', 'facebookService',
function($rootScope, $scope, cookies, $state, facebookService){
    vm = this
    vm.login = true
    vm.farmer = true
    vm.factory = false
    vm.checkCookies = function(){
        data = cookies.get('auth')
        if(data != undefined){
            if(data.status != undefined){
                $rootScope.req_login = true
            }
            else{
                $rootScope.req_login = false
            }
        }
        else{
            $rootScope.req_login = false
        }
    }

    vm.clearCookies = function(){
        cookies.put('auth', {})
        vm.checkCookies()
        facebookService.logout().then(
            function(response){
                console.log("logout");
                console.log(response);
            }
        )

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