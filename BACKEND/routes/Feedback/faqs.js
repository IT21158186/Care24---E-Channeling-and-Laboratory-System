const router = require("express").Router();
let ViewFaq = require("../../models/Feedback/ViewFaq");

http://localhost:8090/faq/add

router.route("/add").post((req,res) => {
    const topic = req.body.topic;
    const intro = req.body.intro;

    const newViewFaq = new ViewFaq({
        topic, intro
    })

    newViewFaq.save().then(() => {
        res.json("faq Sent!")
    }).catch((err) => {
        console.log(err);
    })
})

http://localhost:8090/faq/

router.route("/").get((req,res) => {

    ViewFaq.find().then((faq) => {
        res.json(faq)
    }).catch((err) => {
        console.log(err);
    })
}) 

http://localhost:8090/faq/get/userid

router.route("/get/:id").get(async(req,res) => {
    let userid = req.params.id;

    const user = await ViewFaq.findById(userid)
    .then((user) => {
        res.status(200).send({status: "User faq fetched", user})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with get faq!", error: err.message})
    })
})

module.exports = router;

