const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addFeedbackSchema = new Schema ({

    uname : {
        type : String,
        require : true
    },
    notifications : {
        type : String,
        require : true
    },
    visually : {
        type : String,
        require : true
    },
    experience : {
        type : String,
        require : true
    },
    message : {
        type : String,
        require : true
    },
    service : {
        type : String,
        require : true
    }
})

const AddFeedback = mongoose.model("AddFeedbackTB", addFeedbackSchema);

module.exports = AddFeedback;