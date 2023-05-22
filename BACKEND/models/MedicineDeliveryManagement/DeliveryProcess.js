const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newMedicineDeliverySchema = new Schema({
    deliveryPersonID: {
        type: String,
        default: null
    },
    delivererName: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    orderValue: {
        type: Number,
        default: null
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryCity: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
    },
    deliveryStatus: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("MedicineDelivery", newMedicineDeliverySchema);