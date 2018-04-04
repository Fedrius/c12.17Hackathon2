const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const crypt = {
    createHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    checkPassword: function (password, storedPassword) {
        return bcrypt.compareSync(password, storedPassword);
    }
}


module.exports= function(app, db){

    app.post('/signUp', (req, res, next) => {
        req.checkBody('username', 'Username field cannot be empty.').notEmpty();
        req.checkBody('username', 'Username must be between 3-15 characters long.').len(3, 15);
        req.checkBody('email', 'Email field cannot be empty.').notEmpty();
        req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
        req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
        req.checkBody('password', 'Password field cannot be empty.').notEmpty();
        req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
        req.checkBody('confirmPassword', 'Password must be between 8-60 characters long.').len(8, 60);
        req.checkBody('confirmPassword', 'Passwords do not match, please try again.').equals(req.body.password);

        const errors = req.validationErrors();

        if (errors) {
            res.json(errors);
        }
        else {
            let { username, email, password, confirmPassword } = req.body;
            password = crypt.createHash(password);
            let query = 'INSERT INTO users SET ?';
            let inserts = { username, email, password };
            db.query(query, inserts, (err, results, fields) => {
                if (err){
                    console.log("ERROR: ", err)
                    res.json(err)
                    return next(err)
                } 
                else{
                    res.json(results)
                }
                
            });
            return;
        }
    });

    app.post("/signIn", passport.authenticate('local-signIn'), (req,res)=>{
        return res.json(req.user)
    });
    app.get("/signOut", (req,res,next)=>{
        console.log("signOUt called")
        req.logout();
        req.session.destroy(()=>{
            res.json("success")
            
        })
    })
    app.post("/checkUser", (req,res,next)=>{
        console.log("is user valid: ", req.user);
        res.json({auth: req.isAuthenticated(), data: req.user});
    });
    app.post("/addToHistory", (req,res,next)=>{
        console.log("adding to history");
        if(req.isAuthenticated()){
            let { search_query, beachName } = req.body;
            console.log("sql data: ", beachName, req.user[0])
            let query = 'INSERT INTO searches SET ?';
            let inserts = { search_query, beachName, id:req.user[0] };
            db.query(query, inserts, (err, results, fields) => {
                if (err) {
                    console.log("ERROR adding to search history: ", err)
                    res.json(err)
                    return next(err)
                }
                else {
                    res.json(results)
                }

            });
            return;
        }
        else{
            res.json("no logged in users")
        }
    })

    app.post("/getSearchHistory", (req,res,next)=>{
        console.log("retrieving search History");
        if (req.isAuthenticated()) {
            let id = req.user[0]
            let query = 'SELECT beachName, search_query FROM searches WHERE id = ? GROUP BY beachName ORDER BY max(created) desc LIMIT 10;';
            let inserts = [id];
            db.query(query, inserts, (err, results, fields) => {
                if (err) {
                    console.log("ERROR getting recent searches: ", err)
                    res.json(err)
                    return next(err)
                }
                else {
                    res.json(results)
                }

            });
            return;
        }
        else {
            res.json("no logged in users")
        }

    })

}


