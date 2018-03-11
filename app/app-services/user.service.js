(function() {
  'use strict';

  angular.module('myApp').factory('UserService', UserService);

  UserService.$inject = ['__env', '$http'];

  function UserService(__env, $http) {
    var service = {};

    service.Create = Create;

    return service;

    function Create(user, successCallback, errorCallback) {
      $http.post(__env.apiUrl + '/register', {
          username: user.username,
          password: user.password
        }).success(successCallback)
        .error(errorCallback);
    }
  }

})();
