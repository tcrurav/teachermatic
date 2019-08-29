const Classroom = require('../models/classroom.model');

exports.classroom_check_classroom_activity = function () {
    Classroom.deleteMany({"updatedAt": {$lt: new Date(Date.now() - 60 * 60 * 1000)}}, 
        function(err, classrooms) {
            console.log('%j', classrooms);
        });
};