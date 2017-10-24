'use strict';

angular.module('myApp.listClaims', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listClaims', {
    templateUrl: 'listClaims/listClaims.html',
    controller: 'ListClaimsCtrl'
  });
}])

.controller('ListClaimsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://localhost:8081/getClaims")
  .then(function (response) {
    $scope.claims = response.data;
  });
}]);
