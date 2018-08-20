//===========================
//DEPENDENCIES
//===========================
var express        = require("express"),
    app            = express(),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    bodyParser     = require("body-parser"),
    Recipe         = require("./models/recipe.js"),
    Comment        = require("./models/comment.js"),
    User           = require("./models/user"),
    Rating         = require("./models/rating"),
    seedDB         = require("./seeds.js"),
    flash          = require("connect-flash"),
    methodOverride = require("method-override")

var commentRoutes  = require("./routes/comments"),
    recipeRoutes   = require("./routes/recipes"),
    indexRoutes    = require("./routes/index")

//seedDB();

//ESTABLISH MONGOOSE CONNECTION
mongoose.connect("mongodb://localhost:27017/the_cook_book", {
	keepAlive: true,
	useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURE
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

app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next();
})

//REQUIRING ROUTES
//this needs to be in the end so that everything that needs to be used is.
app.use(indexRoutes);
app.use("/recipes", recipeRoutes);
app.use(commentRoutes);


//==============================================
//SERVER STUFF//
//==============================================
app.listen(3000, function(){
  console.log("The Cook Book Server has started");
});
