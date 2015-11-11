define([
    'app'
], function (app) {
    'use strict';

    return app.config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            var templatesPath = '/static/app/views/';

            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: templatesPath + 'partial-home-page.html',
                    controller: 'homeController'
                })
                .state('subjects', {
                    url: '/subject/',
                    templateUrl: templatesPath + 'partial-subjects-page.html',
                    controller: 'subjectsController'
                })
                .state('subject', {
                    url: '/subject/{subjectId}/',
                    templateUrl: templatesPath + 'partial-subject-page.html',
                    controller: 'subjectController'
                })
        }]);
});