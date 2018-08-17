var express       = require("express"),
    app           = express(),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    bodyParser    = require("body-parser"),
    Recipe        = require("./models/recipe.js"),
    Comment       = require("./models/comment.js"),
    User          = require("./models/user"),
    seedDB        = require("./seeds.js")

seedDB();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})
app.set("view engine", "ejs");

//establish Connection
mongoose.connect("mongodb://localhost:27017/the_cook_book", {
	keepAlive: true,
	useNewUrlParser: true
});

//CONFIGURE passport
app.use(require("express-session")({
  secret: "The Cook Book",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      res.render("recipes/index", {recipes: recipes, user: req.user} );
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
app.post('/recipes/:id/comments', isLoggedIn, function(req, res){
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

//auth ROUTES
app.get('/signup', function(req, res){
  res.render('signup');
})

app.post('/signup', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.render('signup')
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect('/recipes');
      });
    }
  })
})

app.get('/login', function(req, res){
  res.render('login');
})

app.post('/login', passport.authenticate("local", {
  successRedirect: '/recipes',
  failureRedirect: '/login'
}), function(req, res){
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/recipes');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('login');
  }
}

//SERVER STUFF//
app.listen(3000, function(){
  console.log("The Cook Book Server has started");
});
