app.config(['$ocLazyLoadProvider',
    function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            'debug': true, // For debugging 'true/false'
            'events': true, // For Event 'true/false'
            'modules': [
                {
                    name : 'registerCtrl',
                    files: [
                        '/static/Scripts/controller/register/registerCtrl.js',
                        '/static/Scripts/service/register/registerApi.js'
                    ]
                },
                {
                    name : 'registerSelectCtrl',
                    files: [
                        '/static/Scripts/controller/register/registerSelectCtrl.js',
                        '/static/Scripts/service/register/registerApi.js'
                    ]
                },
                {
                    name : 'homeCtrl',
                    files: [
                        'static/Scripts/controller/home/homeCtrl.js',
                        'static/Scripts/service/home/homeApi.js'
                    ]
                },
                {
                    name : 'loginCtrl',
                    files: [
                        '/static/Scripts/controller/login/loginCtrl.js',
                        '/static/Scripts/service/login/loginApi.js'
                    ]
                },
                {
                    name : 'registerDetailCtrl',
                    files: [
                        '/static/Scripts/controller/register/registerDetailCtrl.js',
                        '/static/Scripts/service/register/registerDetailApi.js'
                    ]
                },
                {
                    name : 'productPostCtrl',
                    files: [
                        '/static/Scripts/controller/product/productPostCtrl.js',
                        '/static/Scripts/service/product/productApi.js'
                    ]
                },
                {
                    name : 'productDetailCtrl',
                    files: [
                        '/static/Scripts/controller/product/productDetailCtrl.js',
                        '/static/Scripts/service/product/productApi.js'
                    ]
                }
            ]
        });
    }
])