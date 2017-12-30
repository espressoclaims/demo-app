'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.transactions',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/', {
      controller: 'TransactionsController',
      templateUrl: 'transactions/transactions.view.html',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
}]);
