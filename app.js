var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/the_cook_book");
//schema set up
var recipeSchema = new mongoose.Schema({
  name: String,
  image: String
})
var Recipe = mongoose.model("recipe", recipeSchema);

// Recipe.create(
//   {
//     name: "Penne Arabiata",
//     image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png"
//   }, function(err, recipe){
//   if(err){console.log(err);} else {console.log(recipe);}
//   }
// )

//ROUTES
app.get('/', function(req, res){
  res.render("landing");
})

app.get('/recipes', function(req, res){
  //get all recipes
  Recipe.find({}, function(err, recipes){
    if(err){console.log(err)} else {
      res.render("recipes", {recipes: recipes} );
      console.log("all recipes succesfully found")
    }
  })

});

app.post('/recipes', function(req, res){
//get data, create recipe and save to DB
  console.log(req.body);
  var name = req.body.name;
  var image = 'https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png';
  var newRecipe = {name, image};
  Recipe.create(newRecipe, function(err, recipe){
    if(err){console.log(err);} else {res.redirect('/recipes');}
  })

  //redirect to /recipes

});

app.get('/recipes/new', function(req, res){
  res.render("newRecipe");
});


//SERVER STUFF//
app.listen(3000, function(){
  console.log("The Cook Book Server has started");
});
