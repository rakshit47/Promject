"use strict";

var MongoClient = require("mongodb").MongoClient;

var _require = require("mongodb"),
    ObjectId = _require.ObjectId;

var client = new MongoClient("mongodb://localhost:27017");
var coll = client.db("User").collection("Name");
client.connect(function (err) {
  console.log("Connected to DB"); //showAll();
  // showOne("62f7cef0971256e22e478775");
  //insertOne(obj);
});

exports.showAll = function _callee() {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(coll.find().toArray());

        case 2:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.showOne = function _callee2(id) {
  var data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(coll.findOne({
            _id: ObjectId("".concat(id))
          }));

        case 2:
          data = _context2.sent;
          console.log(data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.insertOne = function _callee3(params) {
  var data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(coll.insertOne(params));

        case 2:
          data = _context3.sent;
          console.log(data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};