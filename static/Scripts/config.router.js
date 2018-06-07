app.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider',
    function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('stateName', {
                url: '/',
                templateUrl: "static/partials/home2.html",
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('homeCtrl');
                    }]
                }
            });
    }
])
