const express = require('express');
const bodyParser = require('body-parser')
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

// app.use(morgan('dev'));
// app.use(cookieParser());

// app.use(session({ secret: 'surfsUpBeaches' })); 
// app.use(passport.initialize());
// app.use(passport.session()); 

app.post('/signUp', (req,res,next)=>{
    console.log("It worked!");
    console.log(req.body);
    const { username, email, password, confirmPassword } = req.body;
    let query = 'INSERT INTO users SET ?';
    let inserts = { username, email, password };
    db.query(query, inserts, (err, results, fields) => {
        if (err) return next(err)
        res.json(results)
    });
    return;
})


app.listen(3040, function () {
    console.log('listening on port 3040')
})