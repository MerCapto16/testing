const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("order.pug");
  //   res.sendFile(__dirname + "/html/order.html");
});
app.get("/sellbuy", (req, res) => {
  res.render("sellbuy.pug");

  //   res.sendFile(__dirname + "/html/sellbuy.html");
});
app.get("/lostfound", (req, res) => {
  res.render("lostfound.pug");

  //   res.sendFile(__dirname + "/html/lostfound.html");
});
app.get("/cart", (req, res) => {
  res.render("cart.pug");

  //   res.sendFile(__dirname + "/html/cart.html");
});
app.get("/login", (req, res) => {
  //   res.render("order.pug");

  res.sendFile(__dirname + "/html/login.html");
});

app.listen(8000, () => {
  console.log("runnning at port 8000");
});
