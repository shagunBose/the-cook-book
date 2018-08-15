var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var recipes = [
  {name: "Chocolate Pancakes", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Penne Arabiata", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Margaritta Pizaa", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Homemade Sponge Cake", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Chocolate Pancakes", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Penne Arabiata", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Margaritta Pizaa", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Homemade Sponge Cake", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Chocolate Pancakes", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Penne Arabiata", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Margaritta Pizaa", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"},
  {name: "Homemade Sponge Cake", image: "https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png", text: "This is a placeholder blog post"}
]

//ROUTES
app.get('/', function(req, res){
  res.render("landing");
})

app.get('/recipes', function(req, res){
  res.render("recipes", {recipes: recipes} );
});

app.post('/recipes', function(req, res){
  //get data from form and add to recipes array
  console.log(req.body);
  var name = req.body.name;
  var image = 'https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png';
  recipes.push({name: name, image: image});
  //redirect to /recipes
  res.redirect('/recipes');
});

app.get('/recipes/new', function(req, res){
  res.render("newRecipe");
});


//SERVER STUFF//
app.listen(3000, function(){
  console.log("The Cook Book Server has started");
});
