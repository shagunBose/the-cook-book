var Recipe = require("../models/recipe")
var Comment = require("../models/comment")
var middleware = {};

middleware.checkRecipeOwnership = function (req, res, next){
  if(req.isAuthenticated()){
    Recipe.findById(req.params.id, function(err, recipe){
      if(err || !recipe){
        req.flash("error", "Something went wrong, please try again");
        res.redirect("/recipes");
      }else{
        //does the user own the recipes
        if(!recipe){
          req.flash("error", "Something went wrong, please try again");
        }
        if(recipe.author.id.equals(req.user._id)){
          next();
        } else {
          //no permission to do so
          req.flash("error", "You don't have permission to edit this recipe.");
          res.redirect("back");
        }
      }
    })
  } else {
    req.flash("error", "You need to be logged in.");
    res.redirect('back');
  }
}

middleware.checkCommentsOwnership  = function (req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err || !comment){
          req.flash("error", "Something went wrong, please try again")
          res.redirect("/recipes");
        } else {
          if(!comment){
            req.flash("error", "Something went wrong, please try again");
          }
          //does the user own the comment
          if(comment.author.id.equals(req.user._id)){
            next();
          } else {
            //no permission to do so
            req.flash("error", "You don't have permission to edit this comment.");
            res.redirect("back");
          }
        }
    })
  } else {
      req.flash("error", "You need to be logged in.");
      res.redirect('back');
  }
}

middleware.isLoggedIn = function (req, res, next){
if(req.isAuthenticated()){
    return next();
  }else{
    req.flash("error", "You need to be logged in.");
    res.redirect('/login');
  }
}



module.exports = middleware
