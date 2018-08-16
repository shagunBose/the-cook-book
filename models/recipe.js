var mongoose = require("mongoose");

//schema set up
var recipeSchema = new mongoose.Schema({
  name: String,
  directions: String,
  image: {
    type: String,
    default: 'https://freepngimg.com/download/cooking_tools/7-2-cooking-tools-png-clipart.png'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Recipe", recipeSchema);
