'use strict';

angular.module('myApp.provider', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/provider', {
    templateUrl: 'provider/provider.html',
    controller: 'ProviderCtrl'
  });
}])

.controller('ProviderCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.status = '';

  $scope.isClaimable = function(service, amount) {
    return amount < 100;
  }

  $scope.canClaim = function(service, amount) {
    return 0.5*amount;
  }

  $scope.processClaim = function(claim) {
    // FIXME: this logic is CRAP and needs to be replaced with an actual data source!!
    if($scope.isClaimable(claim.servicePerformed, claim.amount)) {
      claim.isClaimable = true;
      claim.amount = $scope.canClaim(claim.servicePerformed, claim.amount);
    } else {
      claim.isClaimable = false;
    }

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
