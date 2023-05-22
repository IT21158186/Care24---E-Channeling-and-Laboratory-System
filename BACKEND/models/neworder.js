const mongoose = require ("mongoose");

const Schema= mongoose.Schema;

const newOrder= new Schema({

    itemcode:{
        type:String,
        required: true,
    },

    quantity:{
        type:Number,
        required: true,
    },

    brandName:{
        type: String,
       
    },

    requiredDate:{
        type: String, 
        required: true,
    }

},

{timestamps:false});

const NewOrdr = mongoose.model("neworder",newOrder);

module.exports= NewOrdr;