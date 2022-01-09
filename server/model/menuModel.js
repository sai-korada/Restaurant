const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 8,
  },
  size: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  price: Number,
});

const Pizza = new mongoose.model("Pizza", PizzaSchema);

module.exports = Pizza;
