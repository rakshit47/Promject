require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./back/database");
const mail = require("./back/mail");

app.use(express.static(__dirname));

app.use(express.json());

app.listen(PORT, console.log(`Listening at PORT ${PORT}...`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/base.html");
});

app.post("/otp", (req, res) => {
  let ran = Math.floor(Math.random() * 10000);
  // console.log(req.body);
  let user = {
    email: req.body.email,
    otp: ran,
  };
  db.checkUser(user).then((r) => {
    res.status(r.status).json(r);
  });
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/front/index2.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/front/index3.html");
});
