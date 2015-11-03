define([
    '../module.js'
], function (controllers) {
    controllers.controller('homeController', ["$scope", "$http", "$controller",
        function ($scope, $http, $controller) {

        var loadData = function () {
            $http({
                method: 'GET',
                url: '/post/'
            }).then(function successCallback(response) {
                $scope.posts = response.data;
            }, function(response) {
                console.log(response);
                throw new TypeError;
            })
        };

        $scope.init = function() {
            $controller('homeState', {$scope: $scope});
            loadData();
        };
        $scope.init();
    }]);
});
