const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const viewFaqSchema = new Schema ({

    topic : {
        type : String,
        require : true
    },
    intro : {
        type : String,
        require : true
    }
})

const ViewFaq = mongoose.model("FAQTB", viewFaqSchema);

module.exports = ViewFaq;