var express = require('express');
var User = require('../models/user');
var secret = require('../database/secret/secret');
var jwt = require('jsonwebtoken');
var router = express.Router();






/*
 *  Authentication routes
 */

router.route('/auth')
.get(function(req, res){

})
.post(function(req, res){
    /* create the JWT here */

    User.findOne({
        username: req.body.username
    }).select('name username password').exec(function(err, user){

        if(err) throw err;

        /* no user with given username found? */
        if(!user) {
            res.json({
              success: false,
              message: "Authentication failed. User not found!"
            });
        }
        else if (user) {
              var validPassword = user.comparePassword(req.body.password);
              console.log('else if')

              if(!validPassword) {
                  res.json({
                    success: false,
                    message: "Authentication failed. Wrong passord given."
                  });
              }
              else {

                var token = jwt.sign({
                            name: user.name,
                            username: user.username
                         }, secret, { expiresIn: 60 * 12 // 12 uur
                     });

                    res.json({
                        success: true,
                        message: "Token generated. You just got your own awesome token!",
                        token: token
                    });
              }
        }

    })
});

/* Middleware for all routes */

router.use(function(req, res, next) {
    console.log('all routes:')
    /* Check authentication for all route the user visits  */

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(token)

    if(token) {

      jwt.verify(token, secret, function(err, decoded){
          if(err) {
            return res.status(403).send({
                success: false,
                message: "Auth token failed."
            });
          }
          else {
              req.decoded = decoded;
              next();
          }
      });

    }
    else {
      return res.status(403).send({
          success: false,
          message: "No token found."
      });
    }


});



router.get('/', function (req, res) {
   console.log('get index');
   res.json({ message: "Request index page" })
});


router.param('name', function(req, res, next, name){
      console.log('name', name);

      req.name = name;
      next();
});

/*
 *  User routes
 */

router.route('/users')
    .get(function(req, res){

      User.find(function(err, users){
         if(err) {
           res.send(err);
         }
         res.json(users)

      });
    })
    .post(function(req, res){
        var user = new User();

        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err){
            if(err) {
                console.log(err);

                if(err.code == 11000) {
                  return res.json({ success: false, message: 'User already exists. Please pick another username.'})
                }
                else {
                    res.send(err);
                }
            }

            res.json({success: true, message: 'User successfully created!'})
        });
    });


/*
 *  Login routes
 */

router.route('/login')
    .get(function(req, res) {
        res.send('Login here!');
    })
    .post(function(req, res){

        console.log('Loggin in...');
        res.send('process authentication login...');
    });


router.route('/users/:user_id')
    .get(function(req, res){
        User.findById(req.params.user_id, function(err, user){
          if(err) {
              res.send(err);
          }
          res.json(user);
        });

    })
    .put(function(req, res){

      // update user info
    })
    .delete(function(req, res){
        // delete user
    });


// get feed of newest logs of users (insta)
router.get('/logs', function (req, res) {
 console.log('get traininglogs');
 res.send('logs')
});


router.get('/me', function(req, res){
  res.send(req.decoded)

});




module.exports = router;
