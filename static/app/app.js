define([
    'angular',
    'angular-ui-router',
    './shared/directives/index',
    './shared/services/index',
    './components/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        //'app.directives',
        'app.controllers',
        'ui.router'
    ]);
});
