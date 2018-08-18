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

//comment edit route
router.get('/recipes/:id/comments/:commentId/edit', function(req, res){
  Comment.findById(req.params.commentId, function(err, comment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {recipe_id: req.params.id, comment: comment});
    }
  })
})

//comments update routes
router.put('/recipes/:id/comments/:commentId/edit', checkCommentsOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
    if(err){
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect('/recipes/' + req.params.id);
    }
  })
})

//delete comments
router.delete('/recipes/:id/comments/:commentId', checkCommentsOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.commentId, function(err, comment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/recipes/" + req.params.id);
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

function checkCommentsOwnership(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentId, function(err, comment){
      if(err){
        res.redirect("back");
      }else{
        //does the user own the comment
        if(comment.author.id.equals(req.user._id)){
          next();
        } else {
          //no permission to do so
          res.redirect("back");
        }
      }
    })
  } else {
    res.redirect('back');
  }
}

module.exports = router;
