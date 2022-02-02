const Pizza = require("../model/menuModel");
const User = require("../model/userModel");

exports.addToCart = async (req, res) => {
  let cartItem = await Pizza.findById({ _id: req.params.id });
};
