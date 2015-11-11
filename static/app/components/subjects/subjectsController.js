define([
    '../module.js'
], function (controllers) {
    controllers.controller('subjectsController', ["$scope", "$http", "$controller",
        function ($scope, $http, $controller) {

        var loadData = function () {
            $http({
                method: 'GET',
                url: '/subject/'
            }).then(function successCallback(response) {
                $scope.subjects = response.data;
            }, function(response) {
                console.log(response);
                throw new TypeError;
            })
        };

        $scope.init = function() {
            $controller('subjectsState', {$scope: $scope});
            loadData();

        };
        $scope.init();
    }]);
});
