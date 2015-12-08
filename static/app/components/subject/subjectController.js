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

            var toggleModal = function (type, id) {
                if (type == 'schedule') {
                    $scope.modalType = type;
                    if (!!id || id == 0) {
                        $scope.currentSchedule = angular.copy($scope.editData.schedules[id]);
                        $scope.currentScheduleId = id;
                    } else {
                        $scope.currentSchedule = subjectFactory.createSchedule();
                        $scope.currentScheduleId = undefined;
                        $scope.currentSchedule.teacher = userService.getUser();
                    }

                } else if (type == 'lesson') {
                    $scope.modalType = type;
                    if (!!id || id == 0) {
                        $scope.currentLesson = angular.copy($scope.editData.lessons[id]);
                        $scope.currentLessonId = id;
                    } else {
                        $scope.currentLesson = subjectFactory.createLesson();
                        $scope.currentLessonId = undefined;
                    }
                }
                $scope.toggle = !$scope.toggle;
                console.log($scope.currentSchedule);
            };

            var saveFeature = function (id, currentFeature, featuresList) {
                if (id || id == 0) {
                    featuresList[id] = angular.copy(currentFeature);
                } else {
                    featuresList.push(currentFeature);
                }
                toggleModal();
            };

            $scope.methods = {
                saveData: saveData,
                editMode: editMode,
                editModeDisable: editModeDisable,
                toggleModal: toggleModal,
                saveFeature: saveFeature
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
