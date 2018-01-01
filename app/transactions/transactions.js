(function() {
  'use strict';

  // use local storage as in-memory database to mock 'Oracle'
  localStorage.setItem("accupunture", 100);
  localStorage.setItem("rmt", 75);

  angular.module('myApp').controller('TransactionsController', TransactionsController).controller('ListClaimsCtrl', ['$scope', '$http', function($scope, $http) {
      $http.get("http://localhost:8081/getClaims")
        .then(function(response) {
          $scope.claims = response.data;
        });
    }]);

  TransactionsController.$inject = ['$rootScope', '$cookies', '$http', 'FlashService'];
  function TransactionsController($rootScope, $cookies, $http, FlashService) {
    var vm = this;

    vm.processClaim = processClaim;

    (function initController() {
      $rootScope.globals = $cookies.getObject('globals') || {};
      if($rootScope.globals.currentUser) {
        vm.user = $rootScope.globals.currentUser.username;
      }
    })();

    function processClaim() {
      vm.dataLoading = true;
      var claim = vm.claim;
      if (localStorage.getItem(claim.servicePerformed) === null) {
        claim.isClaimable = false;
        claim.amountClaimed = claim.amount;
        claim.amountProcessed = "0.00";
      } else {
        claim.isClaimable = true;
        claim.amountClaimed = claim.amount;
        if (localStorage.getItem(claim.servicePerformed) > claim.amount) {
          claim.amountProcessed = claim.amount;
        } else {
          claim.amountProcessed = localStorage.getItem(claim.servicePerformed);
        }
      }
      $http({
        url: 'http://localhost:8081/addClaim',
        method: 'POST',
        data: claim,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        vm.dataLoading = false;
        FlashService.Success(response.data);
      }, function(err) {
        vm.dataLoading = false;
        FlashService.Error(err.data);
      });
    }
  }
})();
