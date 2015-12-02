define([
    'app'
], function (app) {
    'use strict';

    return app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider",
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            var templatesPath = '/static/app/views/';

            $urlRouterProvider.otherwise('/');

            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

            $locationProvider.html5Mode(true);
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: templatesPath + 'partial-home-page.html',
                    controller: 'homeController'
                })
                .state('subjects', {
                    url: '/subject/list',
                    templateUrl: templatesPath + 'partial-subjects-page.html',
                    controller: 'subjectsController'
                })
                .state('subject', {
                    url: '/subject/{subjectId}?state',
                    templateUrl: templatesPath + 'partial-subject-page.html',
                    controller: 'subjectController'
                })
        }]);
});