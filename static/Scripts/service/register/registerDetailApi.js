angular.module('app').service('registerDetailApi', function(Restangular) {

    this.getUserData = function(data){
        return Restangular.all('get_user_data/').post(data)
    }
    
    this.addInformation = function(data){
        return Restangular.all('add_information/').post(data)
    }
})