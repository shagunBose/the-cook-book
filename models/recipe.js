var mongoose = require("mongoose");

//schema set up
var recipeSchema = new mongoose.Schema({
  name: String,
  directions: String,
  image: String
})

module.exports = mongoose.model("recipe", recipeSchema);
