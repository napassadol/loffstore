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

    window.fbAsyncInit = function() {
        FB.init({
        appId      : '190074738365427',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v3.0' // use graph api version 2.8
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
            console.log(response);
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v3.0&appId=190074738365427&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


