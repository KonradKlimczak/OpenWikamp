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
            }, function(response) {
                console.log(response);
                throw new TypeError;
            })
        };

        $scope.init = function() {
            $controller('subjectState', {$scope: $scope});
            loadData($stateParams.subjectId);

        };
        $scope.init();
    }]);
});
