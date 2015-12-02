define([
    '../module.js',
    'angular'
], function (controllers, angular) {
    controllers.controller('subjectController', ["$scope", "$http", "$state", "$controller", "$stateParams", "subjectFactory", "userService",
        function ($scope, $http, $state, $controller, $stateParams, subjectFactory, userService) {

            var loadData = function (subjectId) {
                if (!!subjectId) {
                    $http({
                        method: 'GET',
                        url: '/api/subject/' + subjectId + '/'
                    }).then(function successCallback(response) {
                        $scope.subject = response.data;
                        if ($stateParams.state == 'edit') {
                            editMode();
                        }
                    }, function (response) {
                        console.log(response);
                        throw new TypeError;
                    })
                } else {
                    $scope.subject = subjectFactory.createSubject();
                    editMode();
                    // TODO kklimczak: change on better implementation instead of setTimeout
                    setTimeout(function () {
                        $scope.editData.head_teacher = userService.getUser();
                        console.log('ready');
                    }, 1000);
                }
            };

            var saveData = function () {
                $http({
                    method: 'PUT',
                    url: '/api/subject/',
                    data: $scope.editData
                }).then(function successCallback(response) {
                    $scope.subject.id = response.data.id;
                    $scope.editable = false;
                    refreshUrl();
                    //editModeDisable();
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            var revert = function () {
                $scope.editData = angular.copy($scope.subject);
            };

            var editMode = function () {
                $scope.editable = true;
                //$scope.state = 'edit';
                revert();
                refreshUrl();
            };

            var editModeDisable = function () {
                $scope.editable = false;
                $scope.subject = angular.copy($scope.editData);
                refreshUrl();
            };

            var refreshUrl = function () {
                $state.transitionTo(
                    $state.current.name,
                    {
                        subjectId: $scope.subject.id,
                        state: $scope.editable ? 'edit' : ''
                    },
                    {
                        location: true,
                        inherit: true
                    }
                );
            };

            $scope.methods = {
                saveData: saveData,
                editMode: editMode,
                editModeDisable: editModeDisable
            };

            $scope.init = function () {
                $controller('subjectState', {$scope: $scope});
                loadData($stateParams.subjectId);
                $scope.state = $stateParams.state;
                console.log($scope.state);
                //if (!$stateParams.state) {
                //    editMode();
                //}
                console.log($scope.subject);
            };
        }]);
});
