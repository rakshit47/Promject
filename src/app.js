require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./back/database");
const mail = require("./back/mail");

let user;

app.use(express.static(__dirname));

app.use(express.json());

app.listen(PORT, console.log(`Listening at PORT ${PORT}...`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/base.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/front/dashboard.html");
});

app.post("/check-user", (req, res) => {
  // console.log(req.body.email);
  db.checkUser(req.body)
    .then((r) => {
      res.status(r.status).json({msg: r.msg});
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/send-otp", (req, res) => {
  let ran = Math.floor(Math.random() * 10000);
  console.log(req.body);
  user = {
    email: req.body.email,
    otp: ran,
  };
  db.saveOtp(user)
    .then((r) => {
      // console.log(r);
      // res.status(r.status).json(r.msg);
    })
    .catch((err) => res.send(err));
  console.log("Hello");
  mail.sendOtp(user.email, user.otp).then((r) => {
    console.log("Sending Mail..." + r.accepted)
    res.json("Mail Sent");
  });
});

app.post("/verify-otp", (req, res) => {
  user.otp = req.body.otp;
  db.verifyOtp(user).then((r) => {
    res.status(r.status).send({msg: r.msg});
  });
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/front/index2.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/front/index3.html");
});
