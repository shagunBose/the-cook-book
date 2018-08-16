var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose");
    Recipe      = require("./models/recipe")

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/the_cook_book");



//create new Pre-Recipe
// Recipe.create({
//   name: "Chicken Parmesan",
//   image:'https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png',
//   directions: '1. Soak Chicken 2. Add Tomato 3. Fry 4. Add Parmesan 5.Serve Hot!'
// }, function(err, recipe){
//   if(err){console.log(err);}
// })

//ROUTES
app.get('/', function(req, res){
  res.render("landing");
})

app.get('/recipes', function(req, res){
  //get all recipes
  Recipe.find({}, function(err, recipes){
    if(err){console.log(err)} else {
      res.render("index", {recipes: recipes} );
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

});

app.get('/recipes/new', function(req, res){
  //find the crecipe with provided
  //render show template
  res.render("new");
});

app.get('/recipes/:id', function(req, res){
  //find recipe on the basis of ID
  var id = req.params.id
  Recipe.findById(id, function(err, foundRecipe){
    if(err){console.log(err);}
    else{res.render('show', {recipe: foundRecipe});}
  })
});

//SERVER STUFF//
app.listen(3000, function(){
  console.log("The Cook Book Server has started");
});
