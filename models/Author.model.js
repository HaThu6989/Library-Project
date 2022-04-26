const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: String,
    favouriteFood: String,
    country: String,
    rating: Number
  }
);


const Author = model("Author", authorSchema);

module.exports = Author;