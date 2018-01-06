(function() {
  'use strict';

  var env = {};

  // Import variables if present (from env.js)
  if (window) {
    Object.assign(env, window.__env);
  }

  // Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'ngCookies'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'home/home.view.html',
        controllerAs: 'vm'
      })
      .when('/transactions', {
        controller: 'TransactionsController',
        templateUrl: 'transactions/transactions.view.html',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).
  run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.username;
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/']) === -1;
      var loggedIn = $rootScope.globals.currentUser;

      if (restrictedPage && !loggedIn) {
        $location.path('/');
      }
    });
  }]).
  constant('__env', env);
})();
