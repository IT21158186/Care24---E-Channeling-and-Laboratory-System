const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newResultSchema=new Schema({
    test1: {
        type: String,
        required: true
    },
   test2: {
        type: String,
        required: true
    },
    test3: {
        type: String,
        required: true
    },
    result1: {
        type: String,
        required: true
    },
    result2: {
        type: String,
        required: true
    },
    result3: {
        type: String,
        required: true
    },
    unit1: {
        type: String,
        required: true
    },
    unit2: {
        type: String,
        required: true
    },
    unit3: {
        type: String,
        required: true
    },
    refValue1: {
        type: String,
        required: true
    },
   refValue2: {
        type: String,
        required: true
    },
    refValue3: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Result", newResultSchema);