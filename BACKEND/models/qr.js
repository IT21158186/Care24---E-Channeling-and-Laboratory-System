const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const qrSchema = new Schema({
    time_out : {
        type : String,
        required : false
    }
})

const Qr = mongoose.model("Qr", qrSchema);

module.exports = Qr;