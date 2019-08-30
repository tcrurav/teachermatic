const express = require('express');
const router = express.Router();

const classroom_controller = require('../controllers/classroom.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', classroom_controller.test);
router.post('/create', classroom_controller.classroom_create);
router.get('/byId/:id', classroom_controller.classroom_details_by_id);
router.get('/byName/:classroomName', classroom_controller.classroom_details_by_name);
router.put('/:id/update', classroom_controller.classroom_update);
router.put('/:id/addStudent', classroom_controller.classroom_add_student);
router.put('/:classroomId/:studentName/requestTicket', classroom_controller.classroom_request_ticket);
router.put('/:classroomId/attendNextStudent', classroom_controller.classroom_attend_next_student);
router.delete('/:id/delete', classroom_controller.classroom_delete);

module.exports = router;