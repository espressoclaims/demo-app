'use strict';

angular.module('myApp.insurer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/insurer', {
    templateUrl: 'insurer/insurer.html',
    controller: 'InsurerCtrl'
  });
}])

.controller('InsurerCtrl', [function() {

}]);
