define([
    '../module.js'
], function (controllers) {
    controllers.controller('subjectState', function($scope) {
        $scope.subject = {};
        $scope.sendData = {};
        $scope.editable = false;
        $scope.currentSchedule = {};
        $scope.currentScheduleId = 0;
        $scope.currentLesson = {};
        $scope.currentLessonId = 0;
        $scope.toggle = false;
        $scope.modalType = '';
    })
});
