const express = require('express');
const bodyParser = require('body-parser');

// Imports routes
const student = require('./routes/student.route');
const classroom = require('./routes/classroom.route');

// const classroom_controller = require('../controllers/classroom.controller');

var cors = require('cors');

const app = express();

app.use(cors());

// Set up mongoose connection
const mongoose = require('mongoose');
//let dev_db_url = 'mongodb://teachermatic:teachermatic@ds123619.mlab.com:23619/teachermatic';
let dev_db_url = 'mongodb+srv://teachermatic:teachermatic@cluster0-rjiye.mongodb.net/teachermatic?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/students', student);
app.use('/classrooms', classroom);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// var messages = [ {message: 'hola'} ];

io.on('connection', function (socket) {
  console.log('Alguien se ha conectado con Sockets');

  socket.emit('classroom-changed');

  socket.on('new-ticket-obtained', function () {
    io.sockets.emit('classroom-changed');
  });

  socket.on('attended-next-student', function () {
    io.sockets.emit('classroom-changed');
  });

  socket.on('disconnect', function () {

  });

});

var checkClassroomActivity_controller = require('./controllers/classroom.checkClassroomActivity');

let port = 1234;
server.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);

  // Classrooms not used longer than 1 hour will be deleted.
  setInterval(checkClassroomActivity_controller.classroom_check_classroom_activity, 
    60 * 60 * 1000);
});





