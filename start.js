var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var upload = require('./routes/v1/upload');
var download = require('./routes/v1/download');

var index = require('./routes/v2/index');
// var uploadController = require('./routes/v2/uploadController');
// var downloadController = require('./routes/v2/downloadController');
// var deleteController = require('./routes/v2/deleteController');
var infoController = require('./routes/v2/fileInfoController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//流量控制
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/v1/upload', upload);
app.use('/v1/download', download);

app.use('/v2/file', index);
// app.use('/v2/file', uploadController);
// app.use('/v2/file', downloadController);
// app.use('/v2/file', deleteController);
app.use('/v2/info', infoController);

app.get('/*', function(req, res) {
  res.writeHead(200);
  res.end('Hello!');
});

mongoose.connect('mongodb://localhost/Files'); // connect to our database

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
