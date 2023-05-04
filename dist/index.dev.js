"use strict";

var express = require("express");

var cors = require("cors");

var app = express();

var mail = require("./mail");

var PORT = process.env.PORT || 3001;
ran = {};
exports.ran = (void 0).ran;
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
app.post("/", function (req, res) {
  console.log(req.body.url);
  res.status(419).json("Hello World");
});
app.post("/:id", function (req, res) {
  var email = req.params.id;
  ran[email] = Math.floor(Math.random() * 9999 + 1000); // res.json(ran[email])

  mail.sendMail(ran[email], email).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.send(err);
  });
});

exports.verifyOtp = function (req, res, next) {
  // console.log(req.body.otp);
  try {
    if (req.body.otp == null) throw {
      status: 404,
      msg: "⛔ Missing OTP"
    };
    if (req.body.otp != ran[req.body.email]) throw {
      status: 403,
      msg: "⛔ Wrong OTP"
    }; // ran[req.body.email] = null

    next(); // res.status(200).json("Verification Successful");
  } catch (err) {
    res.status(err.status || 500).json(err.msg || "⛔ Internal Server Error");
  }
};

var userRoute = require("./routes/users");

app.use("/user", userRoute);
app.listen(PORT, console.log("Listening at ".concat(PORT)));