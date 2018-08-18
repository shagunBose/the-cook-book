var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");

//==========================
//ROOT ROUTE
//==========================
router.get('/', function(req, res){
  res.render("landing");
})


//===========================
//AUTH ROUTES
//===========================

//SIGN UP
router.get('/signup', function(req, res){
  res.render('signup');
})

router.post('/signup', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.render('signup')
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect('/recipes');
      });
    }
  })
})

//LOGIN
router.get('/login', function(req, res){
  res.render('login');
})

router.post('/login', passport.authenticate("local", {
  successRedirect: '/recipes',
  failureRedirect: '/login'
}), function(req, res){
});

//LOGOUT
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/recipes');
})


module.exports = router;
