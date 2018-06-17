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
            .state('register/extend', {
                url: '/register/extend',
                templateUrl: "/static/partials/register_extend.html",
                resolve: loadSequence('registerDetailCtrl')
            })
            .state('product/post/sell', {
                url: '/product/post/sell',
                templateUrl: "/static/partials/product_post_sell.html",
                resolve: loadSequence('productPostCtrl')
            })
            .state('product/post/buy', {
                url: '/product/post/buy',
                templateUrl: "/static/partials/product_post_buy.html",
                resolve: loadSequence('productPostCtrl')
            })
            .state('product/detail', {
                url: '/product',
                templateUrl: "/static/partials/product_details.html",
                resolve: loadSequence('productDetailCtrl')
            })
            .state('contact', {
                url: '/contact',
                templateUrl: "/static/partials/product_details.html"
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
