app.service('loginApi', function(Restangular) {

    this.login = function(data){
        return Restangular.all('auth_login/').post(data)
    }

})