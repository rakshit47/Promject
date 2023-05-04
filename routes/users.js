const express = require("express");
const router = express.Router();
const main = require("../index")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient("mongodb://localhost:27017");

const coll = client.db("User").collection("Name");

client.connect((err) => {
  console.log("Connected to DB");
});

//Get ALl Users
router.get("/", async (req, res) => {
  try {
    const users = await coll.find().toArray();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create New User
router.post("/register", main.verifyOtp, async (req, res) => {
  try {
    // console.log('Hello');
    if (!req?.body?.name) throw { status: 404, message: "Name is required" };
    if (!req?.body?.email) throw { status: 404, message: "Email is required" };
    if (!req?.body?.roll)
      throw { status: 404, message: "Roll Number is required" };
    if (!req?.body?.branch)
      throw { status: 404, message: "Branch is required" };
    if (!req?.body?.sem) throw { status: 404, message: "Semester is required" };
    if (!req?.body?.password)
      throw { status: 404, message: "Password is required" };
    // if ((await coll.countDocuments({ email: req?.body?.email })) == 1)
    //   throw { status: 403, message: "Email Already Exists Use Another Email" };

    const user = await coll.insertOne({
      name: req.body.name,
      email: req.body.email,
      roll: req.body.roll,
      phone: req?.body?.phone,
      branch: req.body.branch,
      sem: req.body.sem,
      image: req?.body?.image,
      password: bcrypt.hashSync(req.body.password, 12),
    });
    user.message = "New User Created";
    ran[req.body.email] = null
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

// router.get("/register", async (req, res) => {
//   try {
//     const user = await coll.findOne({ email: req?.body?.email });
//     if (user == null) throw { status: 404, message: "Email Not Found!" };
//     if (!bcrypt.compareSync(req?.body?.password, user.password))
//       throw { status: 403, message: "Wrong Password" };
//     res.send("Logined Successfully");
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// });

//Get One User
router.get("/:id", getUser, (req, res) => {
    res.send(res.user);
  });

async function getUser(req, res, next) {
  let user;
  try {
    user = await coll.findOne({ roll: req.params.id });
    if (user == null) throw { status: 404, message: "Not Found" };
    res.user = user;
    next();
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = router;
