var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose"),
    Recipe      = require("./models/recipe.js"),
    Comment     = require("./models/comment.js")
    seedDB      = require("./seeds.js")

seedDB();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
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
      res.render("recipes/index", {recipes: recipes} );
      console.log("all recipes succesfully found")
    }
  })

});

app.post('/recipes', function(req, res){
//get data, create recipe and save to DB
  console.log(req.body);
  var newRecipe = req.body.recipe;
  Recipe.create(newRecipe, function(err, recipe){
    if(err){console.log(err);} else {res.redirect('/recipes');}
  })

});

app.get('/recipes/new', function(req, res){
  //find the recipe with provided
  //render show template
  res.render("recipes/new");
});

app.get('/recipes/:id', function(req, res){
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

//COMMENTS ROUTES//

//comment create
app.post('/recipes/:id/comments', function(req, res){
   //get comment data
   Recipe.findById(req.params.id, function(err, recipe){
      if(err){
        console.log(err);
      } else{
        Comment.create(req.body.comment, function(err, comment){
            if(err){console.log(err)}
            else{
              console.log(comment);
              recipe.comments.push(comment);
              recipe.save();
              res.redirect('/recipes/' + recipe._id);
            }
        })
      }
   })
   //add comment data to recipe
})

//SERVER STUFF//
app.listen(3000, function(){
  console.log("The Cook Book Server has started");
});
