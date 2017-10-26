'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html'
  });
}])
.controller('ListClaimsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://localhost:8081/getClaims")
  .then(function (response) {
    $scope.claims = response.data;
  });
}])
.controller('ProcessClaimsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.status = '';

  $scope.processClaim = function(claim) {
    //FIXME 'isClaimable' field needs to be eventually removed
    claim.isClaimable = true;
    $http({
          url: 'http://localhost:8081/addClaim',
          method: 'POST',
          data: claim,
          headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
      $scope.status = response.data;
    }, function(err) {
      $scope.status = err.data;
    });
  };
}]);
