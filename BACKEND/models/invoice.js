const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({

    invoiceNumber:{
        type:Number,
        required:true
    },
    itemCode:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

})

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;