var mongoose = require("mongoose");

//schema set up
var recipeSchema = new mongoose.Schema({
  name: String,
  directions: String,
  image: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Recipe", recipeSchema);
