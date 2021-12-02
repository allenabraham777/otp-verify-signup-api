const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose   = require('mongoose');
require('dotenv').config();

const router = require('./routes');

const app = express();

//Database Connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.j4qhz.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`)
.then(_=>console.log("CONNECTED TO MONGO DB"))
.catch(err=>console.error("ERROR CONNECTONG TO MONGO DB", err));
mongoose.set('debug', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.sendStatus(err.status || 500);
});

module.exports = app;
