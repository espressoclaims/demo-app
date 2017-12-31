'use strict';

  angular.module('myApp.home', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home/home.view.html'
    });
  }])
  .controller('HomeController', [function() {
    console.log('In HomeController');
  }]);
