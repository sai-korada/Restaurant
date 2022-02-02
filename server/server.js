const express = require("express");
const mongoose = require("mongoose");
const menuController = require("./controller/menuController");
const userController = require("./controller/userController.js");
const cartController = require("./controller/cartController");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const port = 4000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

main();

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://saikumar:Google1234@cluster0.aqe1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
}

app.post("/menu/item", menuController.CreatePizza);
app.get("/menu/items", menuController.GetPizza);
app.post("/api/v1/signup", userController.createUser);
app.post("/api/v1/login", userController.loginUser);
app.post("/api/v1/logout", userController.logoutUser);
app.patch(
  "/api/v1/addToCart/:id",
  userController.validateUser,
  cartController.addToCart
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
