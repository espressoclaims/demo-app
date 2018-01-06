(function() {
  'use strict';

  // use local storage as in-memory database to mock 'Oracle'
  localStorage.setItem("accupunture", 100);
  localStorage.setItem("rmt", 75);

  angular.module('myApp').controller('TransactionsController', TransactionsController);

  TransactionsController.$inject = ['__env', '$rootScope', '$cookies', '$http', '$location', 'FlashService', 'AuthenticationService'];
  function TransactionsController(__env, $rootScope, $cookies, $http, $location, FlashService, AuthenticationService) {
    var vm = this;

    vm.processClaim = processClaim;
    vm.getClaims = getClaims;
    vm.logout = logout;

    (function initController() {
      $rootScope.globals = $cookies.getObject('globals') || {};
      if($rootScope.globals.currentUser) {
        vm.user = $rootScope.globals.currentUser.username;
      }

      getClaims();
    })();

    function logout() {
      AuthenticationService.ClearCredentials();
      $location.path('/');
    }

    function getClaims() {
      $http.get(__env.apiUrl + "/getClaims?user=" + vm.user)
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
        url: __env.apiUrl + '/addClaim',
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
