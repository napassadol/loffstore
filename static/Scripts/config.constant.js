app.config(['$ocLazyLoadProvider',
    function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            'debug': true, // For debugging 'true/false'
            'events': true, // For Event 'true/false'
            'modules': [
                {
                    name : 'registerCtrl',
                    files: [
                        'static/Scripts/controller/registerCtrl.js',
                        'static/Scripts/service/registerApi.js'
                    ]
                },
                {
                    name : 'registerSelectCtrl',
                    files: [
                        'static/Scripts/controller/registerSelectCtrl.js',
                        'static/Scripts/service/registerApi.js'
                    ]
                },
                {
                    name : 'homeCtrl',
                    files: [
                        'static/Scripts/controller/homeCtrl.js',
                        'static/Scripts/service/homeApi.js'
                    ]
                },
                {
                    name : 'loginCtrl',
                    files: [
                        'static/Scripts/controller/loginCtrl.js',
                        'static/Scripts/service/loginApi.js'
                    ]
                }
            ]
        });
    }
])