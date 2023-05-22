const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({

    status : {
        type : String,
        required : true
    }
})

const uodateStatus = mongoose.model("uodateStatus", leaveSchema);

module.exports = uodateStatus;