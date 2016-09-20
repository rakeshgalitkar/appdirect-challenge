var challengeApp = angular.module('challengeApp', ['ngRoute', 'challengeApp.Controllers', 'challengeApp.Services', 'challengeApp.Directive'])

challengeApp.config(function($routeProvider, $httpProvider) {
    $routeProvider.
           when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
            }).         
            otherwise({
                redirectTo: '/home'
            });
            
});

