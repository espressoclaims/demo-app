(function() {
  'use strict';

  angular.module('myApp').controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

  function HomeController($location, AuthenticationService, FlashService) {
    var vm = this;

    vm.login = login;

    (function initController() {
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, function successCallback(response) {
        AuthenticationService.SetCredentials(vm.username);
        $location.path('/transactions');
      }, function errorCallback(response) {
        FlashService.Error("Username or password is not valid.");
        vm.dataLoading = false;
      })
    }
  }
})();
