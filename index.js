const express = require("express");
const cors = require("cors");
const app = express();
const mail = require("./mail");
const PORT = process.env.PORT || 3001;
ran = {}
exports.ran = this.ran;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/", (req, res) => {
  console.log(req.body.url);
  res.status(419).json("Hello World");
});

app.post("/:id", (req, res) => {
  let email = req.params.id
  ran[email] = Math.floor(Math.random() * 9999 + 1000);
  // res.json(ran[email])
  mail
    .sendMail(ran[email], email)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

exports.verifyOtp = function (req, res, next) {
  // console.log(req.body.otp);
  try {
    if ( req.body.otp == null) throw { status: 404, msg: "⛔ Missing OTP" }
    if (req.body.otp != ran[req.body.email]) throw { status: 403, msg: "⛔ Wrong OTP" };
    // ran[req.body.email] = null
    next();
    // res.status(200).json("Verification Successful");
  } catch (err) {
    res.status(err.status || 500).json(err.msg || "⛔ Internal Server Error");
  }
};

const userRoute = require("./routes/users");
app.use("/user", userRoute);

app.listen(PORT, console.log(`Listening at ${PORT}`));
