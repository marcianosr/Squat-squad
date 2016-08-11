var express = require('express');
var router = express.Router();

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

/*
 *  User routes
 */

router.get('/users', function (req, res) {
 console.log('get users');
});

router.get('/users/:name', function (req, res) {
 console.log('get users');
 res.send('user:' + req.name)
});


// get feed of newest logs of users (insta)
router.get('/logs', function (req, res) {
 console.log('get traininglogs');
 res.send('logs')
});


module.exports = router;
