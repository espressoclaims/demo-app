'use strict';

// use local storage as in-memory database to mock 'Oracle'
localStorage.setItem("accupunture", 100);
localStorage.setItem("rmt", 75);

angular.module('myApp.home', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html'
  });
}])
.controller('ListClaimsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://35.196.165.21:80/getClaims")
  .then(function (response) {
    $scope.claims = response.data;
  });
}])
.controller('ProcessClaimsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.status = '';

  $scope.processClaim = function(claim) {
    if(localStorage.getItem(claim.servicePerformed) === null) {
      claim.isClaimable = false;
      claim.amountClaimed = claim.amount;
      claim.amountProcessed = "0.00";
    } else {
      claim.isClaimable = true;
      claim.amountClaimed = claim.amount;
      if(localStorage.getItem(claim.servicePerformed) > claim.amount) {
        claim.amountProcessed = claim.amount;
      } else {
        claim.amountProcessed = localStorage.getItem(claim.servicePerformed);
      }
    }
    $http({
          url: 'http://35.196.165.21:80/addClaim',
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
