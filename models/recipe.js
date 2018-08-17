var mongoose = require("mongoose");

//schema set up
var recipeSchema = new mongoose.Schema({
  name: String,
  directions: String,
  image: {
    type: String,
    default: 'https://banner2.kisspng.com/20180403/xlw/kisspng-whisk-bowl-kitchen-utensil-tableware-clip-art-baking-5ac364b2b5ce02.7808817115227547387447.jpg'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
