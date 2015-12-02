define([
    '../module.js'
], function (controllers) {
    controllers.controller('subjectState', function($scope) {
        $scope.subject = {};
        $scope.sendData = {};
        $scope.editable = false;
    })
});
