const Classroom = require('../models/classroom.model');

exports.classroom_create = function (req, res) {
    console.log("dentro de create")
    console.log(req.body);
    let classroom = new Classroom(
        {
            classroomName: req.body.classroomName,
            ticketBeingAttended: req.body.ticketBeingAttended,
            lastTicketAssigned: req.body.lastTicketAssigned,
            teacherName: req.body.teacherName,
            students: []
        }
    );

    classroom.save(function (err, classroomCreated) {
        if (err) return next(err);
        res.send(classroomCreated);
    })
};

exports.classroom_details_by_id = function (req, res) {
    Classroom.findById(req.params.id, function (err, classroom) {
        if (err) return next(err);
        res.send(classroom);
    })
};

exports.classroom_details_by_name = function (req, res) {
    Classroom.findOne({ classroomName: req.params.classroomName }, function (err, classroom) {
        if (err) return next(err);
        console.log(classroom);
        res.send(classroom);
    })
};

exports.classroom_add_student = function (req, res) {
    Classroom.findOneAndUpdate( { _id: req.params.id }, 
        { $push: { students: req.body } }, function (err, classroom) {
        if (err) return next(err);
        res.send(classroom);
    });
};

exports.classroom_update = function (req, res) {
    Classroom.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, classroom) {
        if (err) return next(err);
        res.send('Classroom udpated.');
    });
};

exports.classroom_request_ticket = function (req, res) {
    console.log(req.params.classroomId);
    Classroom.findOne({ _id: req.params.classroomId }, function (err, classroom) {
        console.log('%j', classroom);
        let cr = classroom;
        cr.lastTicketAssigned++;
        cr.students.filter( x => x.name == req.params.studentName )[0].ticket = cr.lastTicketAssigned;
        Classroom.findByIdAndUpdate(req.params.classroomId, {$set: cr}, function (err, classroom) {
            if (err) return next(err);
            res.send(classroom);
        });
    });
};

exports.classroom_attend_next_student = function (req, res) {
    console.log(req.params.classroomId);
    Classroom.findOne({ _id: req.params.classroomId }, function (err, classroom) {
        console.log('%j', classroom);
        let cr = classroom;
        if(cr.ticketBeingAttended > 0){
            cr.students.filter( x => x.ticket == classroom.ticketBeingAttended )[0].ticket = 0;
        }  
        cr.ticketBeingAttended++;      
        Classroom.findByIdAndUpdate(req.params.classroomId, {$set: cr}, function (err, classroom) {
            if (err) return next(err);
            res.send(classroom);
        });
    });
};

exports.classroom_delete = function (req, res) {
    Classroom.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};