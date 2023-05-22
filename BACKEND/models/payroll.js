const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payrollSchema = new Schema({
    employeeId : {
        type : String,
        required : true,
        unique: true
    },
    name : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    casual_leave : {
        type : Number,
        required : true
    },
    medical_leave : {
        type : Number,
        required : true
    },
    bonus : {
        type : Number,
        required : true
    },
    tax : {
        type : Number,
        required : true
    }
})

const payroll = mongoose.model("payroll", payrollSchema);

module.exports = payroll;