define([
    '../module.js'
], function (controllers) {
    controllers.controller('frameController', ["$scope", "$http", "$controller", "$state",
        function ($scope, $http, $controller, $state) {

            $scope.init = function () {
                $controller('frameState', {$scope: $scope});

                $scope.currentState = $state.current.name;
                console.log($state.current.name);


            };
            $scope.init();
        }]);
});
