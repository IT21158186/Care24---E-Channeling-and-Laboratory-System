const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApmtSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        
    },
    age: {
        type: Number,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: false });

const Apmt = mongoose.model("Apmt", ApmtSchema);

module.exports = Apmt;