const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogSchema = new Schema({

    itemCode:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;