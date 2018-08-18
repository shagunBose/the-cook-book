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
      req.flash("error", err.message);
      return res.redirect('signup');
    }else{
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to The Cook Book, " + user.username);
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
  failureRedirect: '/login',
  failureFlash: true
}), function(req, res){
});

//LOGOUT
router.get('/logout', function(req, res){
  req.logout();
  req.flash("success", "Loggged you out!")
  res.redirect('/recipes');
})


module.exports = router;
