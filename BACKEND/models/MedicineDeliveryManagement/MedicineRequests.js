const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newMedicineRequestsSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryCity: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    prescriptionDetails: {
        type: String
        //required: true
    },
    prescriptionFile: {
        type: String,
        default: null
        //required: true    
    },
    orderDate: {
        type: Date,
    },
    orderCost: {
        type: Number,
        default: null
    },
    paymentStatus: {
        type: String,
        default: "N/A"
    },
    deliveryPerson: {
        type: String,
        default: "N/A"
    },
    status: {
        type: String,
        default: "Pending"
    }
})

module.exports = mongoose.model("MedicineRequests", newMedicineRequestsSchema);