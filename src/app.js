const express = require("express");
const app = express();
const PORT = 3000;
const paht = require("path");

app.listen(PORT, console.log(`Listening at PORT ${PORT}...`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/base.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/front/index2.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/front/index3.html");
});
