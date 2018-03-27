const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');

const path = require('path');
const mysql = require('mysql');

const cookieParser = require("cookie-parser");
const morgan = require('morgan');

// Authentication Packages
const session = require('express-session');
const passport = require('passport');

const mysqlCredentials = require('./credentials.js');
const app = express();
const db = mysql.createConnection(mysqlCredentials);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); 

app.use(session({
    secret: 'surfsUp',
    resave: false,
    saveUninitialized: false,
    // cookie: {secure:true} if https uncomment this
}));
app.use(passport.initialize());
app.use(passport.session());










require('./routes/api')(app, db);




app.listen(3040, function () {
    console.log('listening on port 3040')
})