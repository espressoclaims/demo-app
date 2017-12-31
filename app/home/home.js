(function() {
  'use strict';

  angular.module('myApp').controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

  function HomeController($location, AuthenticationService, FlashService) {
    var vm = this;

    console.log('In home controller');
    vm.login = login;

    (function initController() {
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, function(response) {
        console.log(response);
        if (response.success) {
          AuthenticationService.SetCredentials(vm.username);
          $location.path('/transactions');
        } else {
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      })
    }
  }
})();
