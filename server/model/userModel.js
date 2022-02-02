let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    employer: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    passwordConfirm: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (element) {
          return element === this.password;
        },
      },
    },
    cart: {
      type: Array,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  let salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

let User = new mongoose.model("User", userSchema);

module.exports = User;
