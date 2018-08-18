var Recipe = require("../models/recipe")
var Comment = require("../models/comment")
var middleware = {};

middleware.checkRecipeOwnership = function (req, res, next){
  if(req.isAuthenticated()){
    Recipe.findById(req.params.id, function(err, recipe){
      if(err){
        res.redirect("back");
      }else{
        //does the user own the recipes
        if(recipe.author.id.equals(req.user._id)){
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

middleware.checkCommentsOwnership  = function (req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
          res.redirect("back");
        } else {
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

middleware.isLoggedIn = function (req, res, next){
if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login');
  }
}



module.exports = middleware
