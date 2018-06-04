(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngRoute',
        'ngAnimate',
        'rzModule',
        'ui.bootstrap',
        'ngCookies',
        'ngMaterial',
        'uiGmapgoogle-maps',
        'oc.lazyLoad',
        'restangular',
    ]);


    app.config(['$routeProvider', '$ocLazyLoadProvider', 
        function ($routeProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            'debug': true, // For debugging 'true/false'
            'events': true, // For Event 'true/false'
            'modules': [
                {
                    name : 'registerCtrl', // State1 module
                    files: ['static/Scripts/controller/registerCtrl.js']
                },
                {
                    name : 'homeCtrl', // State1 module
                    files: [
                        'static/Scripts/controller/homeCtrl.js',
                        'static/Scripts/service/homeApi.js'
                    ]
                },
                {
                    name : 'loginCtrl', // State1 module
                    files: ['static/Scripts/controller/loginCtrl.js']
                }
            ]
        });

        $routeProvider
        // Home
        .when("/", {
            templateUrl: "static/partials/home2.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('homeCtrl'); // Resolve promise and load before view 
                }]
            }
        })
        // .when("/home2", {
        //     templateUrl: "static/partials/home2.html"
        // })
        .when("/home3", {
            templateUrl: "static/partials/home3.html"
        })
        .when("/home4", {
            templateUrl: "static/partials/home4.html"
        })
        .when("/home5", {
            templateUrl: "static/partials/home5.html"
        })
        .when("/home6", {
            templateUrl: "static/partials/home6.html"
        })
        .when("/about", {
            templateUrl: "static/partials/about.html"
        })
        .when("/services", {
            templateUrl: "static/partials/services.html"
        })
        .when("/register", {
            templateUrl: "static/partials/register.html"
        })
        .when("/login", {
            templateUrl: "static/partials/login.html"
        })
        .when("/products", {
            templateUrl: "static/partials/products.html"
        })
        .when("/products_right_column", {
            templateUrl: "static/partials/products_right_column.html"
        })
        .when("/list_products", {
            templateUrl: "static/partials/list_products.html"
        })
        .when('/products/:productId', {
            templateUrl: 'partials/product_details.html', controller: "detailsCtrl"
        })
        .when('/products_category/:categoryId', {
            templateUrl: 'partials/products_category.html'
        })
        .when("/blog_v1", {
            templateUrl: "static/partials/blog_v1.html"
        })
        .when("/blog_v1_right_column", {
            templateUrl: "static/partials/blog_v1_right_column.html"
        })
        .when("/blog_v2", {
            templateUrl: "static/partials/blog_v2.html"
        })
        .when("/orders", {
            templateUrl: "static/partials/orders.html"
        })
        .when("/contact", {
            templateUrl: "static/partials/contact.html"
        })
        .when("/404", { templateUrl: "static/partials/404.html" })
        // else 404
        .otherwise("/404", { templateUrl: "static/partials/404.html"});
    }]);


    app.factory("services", ['$http', '$window', function ($http, $window) {
        var serviceBase = 'static/data/'
        var serviceBaseMaps = 'static/data/map_style/'
        var obj = {};

        /*************************************
          PRODUCTS
        ************************************/

        obj.getProducts = function () {
            var url = serviceBase + 'products.json';
            return $http.get(url).then(function (data) {
                return data.data;
            });
        
        }

        obj.getDetailsProducts = function () {
            var url = serviceBase + 'details.json';
            return $http.get(url).then(function (data) {
                return data.data;
            });

        }

        obj.getCategories = function () {
            var url = serviceBase + 'categories.json';
            return $http.get(url).then(function (data) {
                return data.data;
            });
        }

        obj.getBlogArg = function () {
            var url = serviceBase + 'offers.json';
            return $http.get(url).then(function (data) {
                return data.data;
            });

        }

        /*************************************
          BLOG
        ************************************/

        obj.getBlogInfo = function () {
            var url = serviceBase + 'blog.json';
            return $http.get(url).then(function (data) {
                return data.data;
            });

        }

        /*************************************
           GOOGLE MAPS
         ************************************/

        obj.getMapsStyles = function (typeMap) {
            var url = serviceBaseMaps + typeMap + '.json';
            return $http.get(url).then(function (data) {
                return data.data;
            });

        }

        
        
        return obj;
    }]);

    app.config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('/');
    });

})();

