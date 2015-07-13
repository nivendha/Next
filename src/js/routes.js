'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('next').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/splash.html'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html'
            })
            .state('summary', {
                url: '/account-summary',
                templateUrl: 'templates/account-summary.html'
            });
    }
]);