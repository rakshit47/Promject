require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATA_URL);
const coll = client.db("local").collection("user");
const temp = client.db("local").collection("temp");
// console.log(process.env.DATA_URL);
// client.connect(console.log("Connected to Database"));

// let user1 = {
//   email: "raj@mail.com",
//   otp: 2394,
// };

//Checking if user exists already
exports.checkUser = checkUser = async (user) => {
  let c = await coll.countDocuments({ email: user.email });
  if (c > 0) {
    return { status: 403, msg: "Email Already in Use" };
  } else {
    return { status: 200 };
  }
};

exports.saveOtp = saveOtp = async (user) => {
  let c = await coll.countDocuments({ email: user.email });
  if (c == 0) {
    let data;
    let c2 = await temp.countDocuments({ email: user.email });
    if (c2 > 0) {
      data = await temp.updateOne(
        { email: user.email },
        { $set: { otp: user.otp } }
      );
      data.msg = "Updated OTP Sent";
    } else {
      data = await temp.insertOne(user);
      data.msg = "OTP Sent";
    }
    data.status = 201;
    return data;
  } else {
    return { status: 403 };
  }
};

exports.verifyOtp = verifyOtp = async (user) => {
  let otpdb = await temp.findOne({ email: user.email });
  if (otpdb.otp == user.otp) {
    await coll.insertOne({ email: user.email });
    await temp.deleteOne({ email: user.email });
    return { status: 201, msg: "New User Account created" };
  } else return { status: 403, msg: "OTP doesn't match" };
};
// let data = temp.findOne({ email: "raj@mail.com" });

// data.then((r) => {
//   console.log(r);
// });
