define([
    './module.js'
], function (services) {
    services.service('subjectFactory', function () {
        this.createSubject = function () {
            return {
                id: "",
                title: "",
                description: "",
                head_teacher: {},
                schedules: [],
                lessons: []
            }
        };

        this.createSchedule = function () {
            return {
                teacher: {},
                date: "",
                from_time: "",
                to_date: "",
                classroom: ""
            }
        };
    })
});
