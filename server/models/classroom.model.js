const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClassroomSchema = new Schema({
    classroomName: { type: String, required: true, max: 100 },
    teacherName: { type: String, required: true, max: 100 },
    ticketBeingAttended: { type: Number, required: true },
    lastTicketAssigned: { type: Number, required: true },
    students: [{
        name: { type: String, required: true, max: 100 },
        ticket: { type: Number, required: true },
    }]
}, {
        timestamps: { createdAt: true, updatedAt: true }
});


// Export the model
module.exports = mongoose.model('Classroom', ClassroomSchema);