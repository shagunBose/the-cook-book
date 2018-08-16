var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var Comment = require("./models/comment");

var data = [
  {
    name: "Chocolate Sponge",
    directions: "The first thing you need is love, patience and butter! Then you got to whoop a whole bunch of ingredients together, toss it in a pan - bake, cook and taste. Finally, serve hot!",
    image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png"
  },
  {name: "Broccoli and Cheddar Soup", directions: "The first thing you need is love, patience and butter! Then you got to whoop a whole bunch of ingredients together, toss it in a pan - bake, cook and taste. Finally, serve hot!", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png"},
  {name: "Homemade Chicken Nuggets", directions: "The first thing you need is love, patience and butter! Then you got to whoop a whole bunch of ingredients together, toss it in a pan - bake, cook and taste. Finally, serve hot!", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png"}
]

function seedDB(){
//remove all recipes
  Recipe.remove({}, function(err){
    if(err){console.log(err)}
    else {
      console.log("Removed Recipes")
      //add customs recipes
      data.forEach(function(seed){
        Recipe.create(seed, function(err, recipe){
            if(err){console.log(err)}
            else {
              console.log("added a Recipe");
              //add comments
              Comment.create({
                text: "I absolutely love this one, it's so simple and yummy :)",
                author: "Homer"
                }, function(err, comment){
                if(err){console.log(err)}
                else{
                  recipe.comments.push(comment);
                  recipe.save();
                  console.log("Comment Added");
                }
              })
            }
          })
      })
    }
  })
}

module.exports = seedDB;
