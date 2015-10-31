define([
    '../module.js'
], function (controllers) {
    controllers.controller('frameController', ["$scope", "$http", "$controller", "$state",
        function ($scope, $http, $controller, $state) {
            var toggleCanvas = function () {
                $scope.offcanvas = !$scope.offcanvas;
            };

            $scope.methods = {
                toggleCanvas: toggleCanvas
            };

            $scope.init = function () {
                $controller('frameState', {$scope: $scope});

                $scope.currentState = $state.current.name;
                console.log($state.current.name);


            };
            $scope.init();
        }]);
});
