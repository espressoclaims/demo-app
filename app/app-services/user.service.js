(function() {
  'use strict';

  angular.module('myApp').factory('UserService', UserService);

  UserService.$inject = ['__env', '$http'];

  function UserService(__env, $http) {
    var service = {};

    service.Create = Create;

    return service;

    function Create(user, successCallback, errorCallback) {
      console.log(user);
      $http({
        url: __env.apiUrl + '/registerUser',
        method: 'POST',
        data: user,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(successCallback)
        .error(errorCallback);
    }
  }

})();
