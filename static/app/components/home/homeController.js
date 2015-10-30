define([
    './module.js'
], function (controllers) {
    controllers.controller('homeController', ["$scope", function ($scope) {
        $scope.test = "test";
    }]);
});
