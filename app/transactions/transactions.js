(function() {
  'use strict';

  // use local storage as in-memory database to mock 'Oracle'
  localStorage.setItem("accupunture", 100);
  localStorage.setItem("rmt", 75);

  angular.module('myApp').controller('TransactionsController', TransactionsController);

  TransactionsController.$inject = ['$rootScope', '$cookies', '$http', 'FlashService'];
  function TransactionsController($rootScope, $cookies, $http, FlashService) {
    var vm = this;

    vm.processClaim = processClaim;
    vm.getClaims = getClaims;

    (function initController() {
      $rootScope.globals = $cookies.getObject('globals') || {};
      if($rootScope.globals.currentUser) {
        vm.user = $rootScope.globals.currentUser.username;
      }

      getClaims();
    })();

    function getClaims() {
      $http.get("http://localhost:8081/getClaims?user=" + vm.user)
        .then(function(response) {
          vm.claims = response.data;
        });
    }

    function processClaim() {
      vm.dataLoading = true;
      var claim = vm.claim;
      claim.user = vm.user;
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
      delete claim["amount"];
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
        getClaims();
      }, function(err) {
        vm.dataLoading = false;
        FlashService.Error(err.data);
      });
    }
  }
})();
