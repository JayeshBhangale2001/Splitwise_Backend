'use strict';

const express = require('express');
const cors = require('cors'); // Import the 'cors' middleware
const mongoose = require('mongoose');
const debug = require('debug')('my express app');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connection URI for your locally hosted MongoDB
mongoose.set('debug', true);
const mongoURI = 'mongodb://localhost:27017/Splitwise';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all routes
app.use(cors());

const server = app.listen(port, function () {
    debug('Express server listening on port ' + server.address().port);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
