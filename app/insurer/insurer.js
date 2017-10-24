'use strict';

angular.module('myApp.insurer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/insurer', {
    templateUrl: 'insurer/insurer.html',
    controller: 'InsurerCtrl'
  });
}])

.controller('InsurerCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://localhost:8081/getClaims")
  .then(function (response) {
    $scope.claims = response.data;
  });
}]);
