(function() {
  'use strict';

  angular.module('myApp').factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];

  function AuthenticationService($http, $cookies, $rootScope, $timeout) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, callback) {
      $timeout(function() {
        var response;
        if (username != null) {
          response = {
            success: true
          };
        } else {
          response = {
            success: false,
            message: 'Username is incorrect'
          };
        }
        callback(response);
      }, 1000);
    }

    function SetCredentials(username) {
      $rootScope.globals = {
        currentUser: {
          username: username,
        }
      };

      $http.defaults.headers.common['Authorization'] = 'Basic ' + username;

      // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.putObject('globals', $rootScope.globals, {
        expires: cookieExp
      });
    }

    function ClearCredentials() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }

})();
