define([
    './module.js'
], function (services) {
    services.service('userService', function () {
        var _currentUser = {};

        this.setUser = function (user) {
            _currentUser = user;
        };

        this.getUser = function () {
            return _currentUser;
        };
    })
});

