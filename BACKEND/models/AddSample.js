const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newAddSampleSchema = new Schema({
    amptId: {
        type: String,
        required: false
    },
    sampleId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    sampleType: {
        type: String,
        required: false
    },
    testName: {
        type: String,
        required: false
    },
    test1: {
        type: String,
        required: false
    },
   test2: {
        type: String,
        required: false
    },
    test3: {
        type: String,
        required: false
    },
    result1: {
        type: String,
        required: false
    },
    result2: {
        type: String,
        required: false
    },
    result3: {
        type: String,
        required: false
    },
    unit1: {
        type: String,
        required: false
    },
    unit2: {
        type: String,
        required: false
    },
    unit3: {
        type: String,
        required: false
    },
    refValue1: {
        type: String,
        required: false
    },
   refValue2: {
        type: String,
        required: false
    },
    refValue3: {
        type: String,
        required: false
    }
    
});

module.exports = mongoose.model("AddSample", newAddSampleSchema);
