const MongoClient = require("mongodb").MongoClient;

const { ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

const coll = client.db("User").collection("Name");

client.connect((err) => {
  console.log("Connected to DB");

  //showAll();
  // showOne("62f7cef0971256e22e478775");
  //insertOne(obj);
});

exports.showAll = async function () {
  let data = await coll.find().toArray();
  // console.log(data);
  return data
};

exports.showOne = async function (id) {
  let data = await coll.findOne({ _id: ObjectId(`${id}`) });
  console.log(data);
};

exports.insertOne = async function (params) {
  let data = await coll.insertOne(params);
  console.log(data);
};
