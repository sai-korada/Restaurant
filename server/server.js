const express = require("express");
const mongoose = require("mongoose");
const menuController = require("./controller/menuController");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const port = 4000;

main();

async function main() {
  await mongoose.connect(
    "mongodb+srv://saikumar:google@cluster0.aqe1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  console.log("Connect to the database");
}

app.post("/menu/item", menuController.CreatePizza);
app.get("/menu/items", menuController.GetPizza);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
