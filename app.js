var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var addTaskRouter = require('./routes/addTask');
var getTasksRouter = require('./routes/getTasks');
var removeTaskRouter = require('./routes/removeTask');
var changeTaskNameRouter = require('./routes/changeTaskName');
var changeTaskPriorityRouter = require('./routes/changeTaskPriority');
var completeTaskRouter = require('./routes/completeTask');
var loginRouter = require('./routes/login');
var signUpRouter = require('./routes/signUp');
const session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use('/addTask', addTaskRouter);
app.use('/getTasks', getTasksRouter);
app.use('/removeTask', removeTaskRouter);
app.use('/changeTaskName', changeTaskNameRouter);
app.use('/changeTaskPriority',changeTaskPriorityRouter);
app.use('/completeTask',completeTaskRouter);
app.use('/login',loginRouter);
app.use('/signUp',signUpRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

	console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//---------------------- global functions -----------------------
dbPool  = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "todo_list"
});

twoDigits = (d) => {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

toMySqlDate = (date) => {
	return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}

toJsonDate = (date) => {
	let t = date.toString().split(/[- :]/);
	return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));;
}

module.exports = app;
