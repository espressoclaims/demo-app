(function() {
  'use strict';

  angular.module('myApp').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', 'UserService', 'FlashService'];

  function RegisterController($location, UserService, FlashService) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      var user = {
        username: vm.username,
        password: vm.password
      };
      UserService.Create(user, function successCallback(response) {
        AuthenticationService.SetCredentials(vm.username);
        FlashService.Success('Registration successful', true);
        $location.path('/transactions');
      }, function errorCallback(error) {
        FlashService.Error("There was an error registering user. Please try again.");
        vm.dataLoading = false;
      });
    }
  }
})();
