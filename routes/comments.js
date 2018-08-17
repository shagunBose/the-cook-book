var express = require("express");
var Recipe = require("../models/recipe.js");
var Comment = require("../models/comment.js");
var router = express.Router();

//Comments create
router.post('/recipes/:id/comments', isLoggedIn, function(req, res){
   //get comment data
   Recipe.findById(req.params.id, function(err, recipe){
      if(err){
        console.log(err);
      } else{
        Comment.create(req.body.comment, function(err, comment){
            if(err){console.log(err)}
            else{
              console.log(comment);
              //add username and ID to comment
              comment.author.id = req.user._id;
              comment.author.username = req.user.username;
              //save comment
              comment.save();
              recipe.comments.push(comment);
              recipe.save();
              res.redirect('/recipes/' + recipe._id);
            }
        })
      }
   })
})

//MIDDLEARE TO CHECK IF LOGGED IN
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login');
  }
}

module.exports = router;
