const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create product schema
const productSchema = new Schema({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  image: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
