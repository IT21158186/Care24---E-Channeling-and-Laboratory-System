const mongoose = require ("mongoose");

const Schema= mongoose.Schema;

const newdispatchOrder= new Schema({

    ItemCode:{
        type: String,
        required: true,
        
    },

    Brand:{
        type:String,
        
    },

  
    Department:{
        type: String,
    },

    Quantity:{
        type: Number,
        required: true,
    }
   
   

});

const newdispatch = mongoose.model("dispatch",newdispatchOrder);

module.exports= newdispatch;