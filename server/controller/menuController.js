const Pizza = require("../model/menuModel");

exports.CreatePizza = async (req, res, next) => {
  let data = req.body;

  try {
    await Pizza.create(data);

    res.json({
      status: 201,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetPizza = async (req, res) => {
  let data = await Pizza.find();

  let userName = req.currentUser[0].name.split(" ")[1];

  res.json({
    status: 200,
    message: `Hello Mr.${userName}`,
    data,
  });
};
