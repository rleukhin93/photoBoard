var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios')

var boardRouter = require('./routes/board');
var photoRouter = require('./routes/photos');

dotenv.config();

var app = express();

var cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/board/', boardRouter);
app.use('/board/:boardId/photos', photoRouter);
app.get('/get-image', async (req, res, next) => {
  try {
      axios.get(req.query.q, {
        responseType: 'stream'
      }).then(function (response) {
        response.data.pipe(res);
      });
  }
  catch (error) {
    console.log(error);
    next(error);
  }

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

mongoose.connect(`${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).catch(err => { console.log(err) });

module.exports = app;
