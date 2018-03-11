(function() {
  'use strict';

  angular.module('myApp').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', 'UserService', 'FlashService', 'AuthenticationService'];

  function RegisterController($location, UserService, FlashService, AuthenticationService) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      UserService.Create(vm.user, function successCallback(response) {
        AuthenticationService.SetCredentials(vm.username);
        FlashService.Success('Registration successful', true);
        $location.path('/transactions');
      }, function errorCallback(error) {
        console.log(error);
        FlashService.Error("There was an error registering user. Please try again.");
        vm.dataLoading = false;
      });
    }
  }
})();
