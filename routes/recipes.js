var express = require("express");
var router = express.Router();
var Recipe = require("../models/recipe.js")

//INDEX
router.get('/', function(req, res){
  //get all recipes
  Recipe.find({}, function(err, recipes){
    if(err){console.log(err)} else {
      res.render("recipes/index", {recipes: recipes, user: req.user} );
      console.log("all recipes succesfully found")
    }
  })

});

//CREATE
router.post('/', function(req, res){
//get data, create recipe and save to DB
  console.log(req.body);
  var newRecipe = req.body.recipe;
  Recipe.create(newRecipe, function(err, recipe){
    if(err){console.log(err);} else {res.redirect('/recipes');}
  })

});

//NEW
router.get('/new', function(req, res){
  //find the recipe with provided
  //render show template
  res.render("recipes/new");
});

//SOW
router.get('/:id', function(req, res){
  //find recipe on the basis of ID
  var id = req.params.id
  Recipe.findById(id).populate("comments").exec(function(err, foundRecipe){
    if(err){console.log(err);}
    else{
      console.log(foundRecipe);
      res.render('recipes/show', {recipe: foundRecipe});
    }
  })
});

module.exports = router;
