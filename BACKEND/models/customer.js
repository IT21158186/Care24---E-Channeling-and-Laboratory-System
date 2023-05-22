const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    clientName:{
        type:String,
        required:true
    },
    clientAddress:{
        type:String,
        required:true
    },
    clientPhone:{
        type:String,
        required:true
    },
    clientEmail:{
        type:String,
        required:true
    },
    invoiceNumber:{
        type:Number,
        required:true
    },
    invoiceDate:{
        type:Date,
        required:true
    },
    total:{
        type:Number,
        required:true
    }

})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;