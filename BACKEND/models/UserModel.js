const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  fullname: {type: String},
  email: {type: String},
  password: { type: String},
  usertype: {type: String, default: "Patient"},
  },
   { 
    timestamps: true 
   }
  );
  
  module.exports = mongoose.model("User", User);
