const Pizza = require("../model/menuModel");

exports.CreatePizza = async (req, res) => {
  let data = req.body;

  await Pizza.create(data, function (err, data) {
    if (err) {
      res.json({
        status: 500,
        data: {
          data,
        },
      });
    } else {
      res.json({
        status: 201,
        data: {
          data,
        },
      });
    }
  });
};

exports.GetPizza = async (req, res) => {
  let data = await Pizza.find();

  res.json({
    status: 200,
    data,
  });
};
