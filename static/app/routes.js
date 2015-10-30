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
                    templateUrl: templatesPath+'partial-home-page.html',
                    controller: 'homeController'
                })
        }]);
});