const mongoose = require('mongoose');

const lastExecutionSchema = new mongoose.Schema({
  lastExecution: {
    type: Date,
    default: null,
  },
});

const LastExecution = mongoose.model('LastExecution', lastExecutionSchema);

module.exports = LastExecution;