// require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://localhost:27017");
const coll = client.db("local").collection("user");
const temp = client.db("local").collection("temp");

// client.connect(console.log("Connected to Database"));

// let user1 = {
//   email: "raj@mail.com",
//   otp: 2394,
// };

//Checking if user exists already
exports.checkUser = checkUser = async (user) => {
  let c = await coll.countDocuments({ email: user.email });
//   console.log(c);
  let data;
  if (c > 0) {
    return { status: 403, msg: "Email Already in Use" };
  } else {
    let c2 = await temp.countDocuments({email: user.email})
    if(c2> 0){
        data = await temp.updateOne({ email: user.email},{$set:{otp: user.otp}})
        data.msg = "Updated OTP Sent"
    }else{
        data = await temp.insertOne(user);
        data.msg = "OTP Sent"
    }
    data.status = 201;
    return data;
  }
};
