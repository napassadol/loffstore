app.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$timeout', '$http', '$cookieStore',
function ($rootScope, $state, $stateParams, $localStorage, $timeout, $http, $cookies) {

    if (!($cookies.get('auth') instanceof Object)) {
        console.log('initial cookies');
        $cookies.put('auth', {});
    }

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            if($cookies.get('auth').status == undefined && toState.name != 'login'){
                event.preventDefault()
                $state.go('login')
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