const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt-nodejs');


const path = require('path');
const mysql = require('mysql');

const cookieParser = require("cookie-parser");
const morgan = require('morgan');

// Authentication Packages
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);

const credentials = require('./credentials.js');
const app = express();
const db = mysql.createConnection(credentials);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); 

const sessionStore = new MySQLStore(credentials);

app.use(session({
    secret: 'surfsUp',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    // cookie: {secure:true} if https uncomment this
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
})



require('./routes/api')(app, db);


passport.use('local-signIn', new LocalStrategy(
    function(username, password, done){
        // console.log("username, ", username);
        // console.log("password", password);
        db.query("SELECT id, password FROM users WHERE username = ?", [username], (err, results, fields)=>{
            if(err) return done(err);
            
            if(results.length ===0){
                console.log("teste")
                return done(null, false, { message: 'Incorrect Username' })
            }
            let storedPassword = results[0].password    
            return bcrypt.compareSync(password, storedPassword) ? done(null, {id:results[0].id, username}) : done(null, false, {message: 'Incorrect Password'});
        })
        
    }
));


passport.serializeUser(function (user, done) {
    console.log("SERIALIZE", user)
    done(null, user);
});

// passport.deserializeUser(function (id, done) {
//         console.log("DESERIALIZE")
//         done(null, id);
// });
passport.deserializeUser(function (id, done) {
    console.log("DESERIALIZE")
    let sql = "SELECT * FROM users WHERE id = ?";
    let inserts = [id.id];
    db.query(sql, inserts,
        function (err, results, fields) {
            done(err, results[0].id)
        }
    );
});



app.listen(3040, function () {
    console.log('listening on port 3040')
})