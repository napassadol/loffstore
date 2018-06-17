angular.module('app').service('productApi', function(Restangular) {

    this.saveDataRegister = function(data){
        return Restangular.all('save_data_register/').post(data)
    }

    this.postProductSell = function(data){
        return Restangular.all('post_product_sell/').post(data)
    }

    this.getUserInfo = function(data){
        return Restangular.all('get_user_data/').post(data)
    }
})