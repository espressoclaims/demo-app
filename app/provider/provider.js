'use strict';

angular.module('myApp.provider', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/provider', {
    templateUrl: 'provider/provider.html',
    controller: 'ProviderCtrl'
  });
}])

.controller('ProviderCtrl', [function() {

}]);
