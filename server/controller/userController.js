let User = require("../model/userModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    let data = req.body;

    let payload = await User.create(data);

    let resData = { ...payload._doc };

    payload = payload.email;

    let token = await jwt.sign(payload, "SECRETFORMYPIZZA");

    res
      .status(201)
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      })
      .json({
        status: "success",
        token: token,
        data: resData,
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
    });
  }
};

exports.loginUser = async (req, res) => {
  const userCredentials = req.body;

  let user = await User.find({ email: userCredentials.email });

  if (user.length === 0) {
    res.status(400).json({
      message: "Please check email and/or password",
    });
  } else {
    let passwordMatch = await bcrypt.compare(
      userCredentials.password,
      user[0].password
    );
    if (passwordMatch) {
      let payload = user[0].email;
      let token = await jwt.sign(payload, "SECRETFORMYPIZZA");
      res
        .status(201)
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        .json({
          status: "success",
          token: token,
        });
    } else {
      res.status(400).json({
        message: "invalid email and/or password",
      });
    }
  }
};

exports.validateUser = async (req, res, next) => {
  let user = await jwt.verify(req.cookies.jwt, "SECRETFORMYPIZZA");

  user = await User.find({
    email: user,
  });

  console.log(user.get("_id"));

  req.existingUser = user;

  if (req.existingUser.length === 0) {
    res.status(401).json({
      message: "user doesn't exist",
    });
  } else {
    next();
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    let user = await jwt.verify(req.cookies.jwt, "SECRETFORMYPIZZA");

    user = await User.find({
      email: user,
    });

    req.existingUser = user;

    if (req.existingUser.length === 0) {
      res.status(401).json({
        message: "user doesn't exist",
      });
    } else {
      let token = "";
      res
        .status(200)
        .cookie("jwt", token, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({
          message: "user loggedout",
          data: token,
        });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
