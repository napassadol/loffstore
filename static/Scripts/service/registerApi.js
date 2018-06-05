angular.module('app').service('registerApi', function(Restangular) {

    this.saveDataRegister = function(data){
        return Restangular.all('save_data_register/').post(data)
    }
})