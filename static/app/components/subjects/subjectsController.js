define([
    '../module.js'
], function (controllers) {
    controllers.controller('subjectsController', ["$scope", "$http", "$controller",
        function ($scope, $http, $controller) {

            var loadData = function () {
                $http({
                    method: 'GET',
                    url: '/api/subject/'
                }).then(function successCallback(response) {
                    $scope.subjects = response.data;
                }, function (response) {
                    console.log(response);
                    throw new TypeError;
                })
            };

            var deleteSubject = function (id) {
                $http({
                    method: 'DELETE',
                    url: '/api/subject/' + id
                }).then(function successCallback(response) {
                    loadData();
                }, function errorCallback (response) {
                    console.log(response);
                });
            };

            $scope.methods = {
                deleteSubject: deleteSubject
            };

            $scope.init = function () {
                $controller('subjectsState', {$scope: $scope});
                loadData();

            };
            $scope.init();
        }]);
});
