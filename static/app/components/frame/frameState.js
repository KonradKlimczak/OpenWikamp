define([
    '../module.js'
], function (controllers) {
    controllers.controller('frameState', function($scope) {
        $scope.name = 'OpenWikamp';
        $scope.offcanvas = false;
        $scope.loading = false;
        $scope.currentUser = {};
    })
});
