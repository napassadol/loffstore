angular.module('app').service('registerDetailApi', function(Restangular) {

    this.saveDataRegister = function(data){
        return Restangular.all('save_data_register/').post(data)
    }
})