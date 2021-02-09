const crypto = require("crypto");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema();

const UserSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: [true, "Please Provide Firstname"],
  },
  Lastname: {
    type: String,
    required: [true, "Please Provide Lastname"],
  },
  Email: {
    type: String,
    required: [true, "Please Provide a Email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide a Valid Email",
    ],
  },
});

const Userdemo = mongoose.model("UserDemo", UserSchema);

module.exports = Userdemo;
