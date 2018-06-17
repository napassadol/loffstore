angular.module('app').service('homeApi', function(Restangular) {

    this.getAllProducts = function(){
        return Restangular.one('get_all_products/').get()
    }
})