const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const viewSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    mobileNo : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    leaveLimit : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const View = mongoose.model("View", viewSchema);

module.exports = View;