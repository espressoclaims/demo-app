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
