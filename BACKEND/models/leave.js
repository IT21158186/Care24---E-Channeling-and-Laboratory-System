const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    employeeId : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    remarks : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
})

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;