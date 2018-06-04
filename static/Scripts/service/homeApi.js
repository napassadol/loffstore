angular.module('app').service('homeApi', function(Restangular) {

    this.test = function(){
        return Restangular.one('test/').get()
    }
})