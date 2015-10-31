define([
    '../module.js'
], function (controllers) {
    controllers.controller('homeController', ["$scope", "$http", "$controller",
        function ($scope, $http, $controller) {
        $scope.test = "test";

        var loadData = function () {
            $http({
                method: 'GET',
                url: '/post/'
            }).success(function(data) {
                $scope.posts = data;
                console.log($scope.posts);
            });
        };

        $scope.init = function() {
            $controller('homeState', {$scope: $scope});
            loadData();
        };
        $scope.init();
    }]);
});
