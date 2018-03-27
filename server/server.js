const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');

const path = require('path');
const mysql = require('mysql');

const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const session = require('express-session');

const mysqlCredentials = require('./credentials.js');
const app = express();
const db = mysql.createConnection(mysqlCredentials);

app.use(express.static(path.join(__dirname, "..")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// app.use(morgan('dev'));
// app.use(cookieParser());

// app.use(session({ secret: 'surfsUpBeaches' })); 
// app.use(passport.initialize());
// app.use(passport.session()); 

require('./routes/api')(app, db);




app.listen(3040, function () {
    console.log('listening on port 3040')
})