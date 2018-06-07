app.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider',
    function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home")

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "static/partials/home2.html",
                resolve: loadSequence('homeCtrl')
            });
        
        
        function loadSequence(ctrl){
            return {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(ctrl);
                }]
            }
        }
    }
])
