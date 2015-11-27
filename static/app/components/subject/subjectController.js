define([
    '../module.js'
], function (controllers) {
    controllers.controller('subjectController', ["$scope", "$http", "$controller", "$stateParams",
        function ($scope, $http, $controller, $stateParams) {

            var loadData = function (subjectId) {
                $http({
                    method: 'GET',
                    url: '/api/subject/' + subjectId + '/'
                }).then(function successCallback(response) {
                    $scope.subject = response.data;
                }, function (response) {
                    console.log(response);
                    throw new TypeError;
                })
            };

            var saveData = function () {
                $http({
                    method: 'PUT',
                    url: '/api/subject/',
                    data: $scope.sendData
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.methods = {
                saveData: saveData
            };

            $scope.init = function () {
                $controller('subjectState', {$scope: $scope});
                loadData($stateParams.subjectId);

            };
            $scope.init();
        }]);
});
