angular.module('app').service('loginApi', function(Restangular) {

    this.test = function(){
        return Restangular.one('test/').get()
    }
})