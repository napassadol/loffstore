    'use strict'

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
        'ui.router',
        'ngStorage',
        'ui.select',
    ]);

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
