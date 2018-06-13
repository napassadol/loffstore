angular.module('app').service('productPostApi', function(Restangular) {

    this.saveDataRegister = function(data){
        return Restangular.all('save_data_register/').post(data)
    }
})