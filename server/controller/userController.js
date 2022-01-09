let User = require("../model/userModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    let reqData = req.body;

    let data = await User.create(reqData);

    let secretToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: `${data.email}`,
      },
      "secret"
    );

    res.status(201).cookie("jwt", secretToken).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    let currentUser = await User.find({ email: req.body.email });

    let status = await bcrypt.compare(
      req.body.password,
      currentUser[0].password
    );

    if (status) {
      res.status(200).json({
        data: "user logged in",
      });
    } else {
      res.status(401).json({
        message: "please enter valid email and password",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.validateUser = async (req, res, next) => {
  try {
    let secretCode = req.headers.authorization.split(" ")[1];

    let status = jwt.verify(secretCode, "secret");

    let currentUser = await User.find({ email: status.data });

    req.currentUser = currentUser;
  } catch (err) {
    res.status(401).json({
      message: "unauthorized",
    });
  }
  next();
};
