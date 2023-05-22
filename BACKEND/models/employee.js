const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    nic : {
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
        required : false
    }
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;