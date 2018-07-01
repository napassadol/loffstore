angular.module('app').service('registerApi', function(Restangular) {

    this.saveDataRegister = function(data){
        return Restangular.all('save_data_register/').post(data)
    }
    this.saveDataRegisterFB = function(data){
        return Restangular.all('save_data_register_fb/').post(data)
    }
})