const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    employeeId: {
        type: String,
        
    },
    name : {
        type : String,
        required : false
    },
    status : {
        type : String,
        required : false,
        enum: ['Present', 'Absent', 'Late', 'Half-day']
    },
    date : {
        type : String,
        required : false
    },
    time_in : {
        type : String,
        required : false
    },
    time_out : {
        type : String,
        required : false
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;