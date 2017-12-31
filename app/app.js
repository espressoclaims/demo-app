'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.home',
  'myApp.transactions'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/', {
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

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    // redirect to login page if not logged in and trying to access a restricted page
    var restrictedPage = $.inArray($location.path(), ['/transactions']) === -1;
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $location.path('/');
    }
  });
}]);
