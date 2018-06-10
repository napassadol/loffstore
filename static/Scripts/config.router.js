app.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider',
    function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home")

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "static/partials/home2.html",
                resolve: loadSequence('homeCtrl')
            })
            .state('register/detail', {
                url: '/register/detail',
                templateUrl: "static/partials/register.html",
                resolve: loadSequence('registerCtrl')
            })
            .state('register', {
                url: '/register',
                templateUrl: "static/partials/register_selection.html",
                resolve: loadSequence('registerSelectCtrl')
            })
            .state('login', {
                url: '/login',
                templateUrl: "static/partials/login.html",
                resolve: loadSequence('loginCtrl')
            })
        
        
        function loadSequence(ctrl){
            return {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(ctrl);
                }]
            }
        }
    }
])
