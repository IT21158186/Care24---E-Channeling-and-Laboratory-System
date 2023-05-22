const router = require("express").Router();
let AddFeedback = require("../../models/Feedback/AddFeedback");

http://localhost:8090/feedback/add

router.route("/add").post((req,res) => {
    const uname = req.body.uname;
    const notifications = req.body.notifications;
    const visually = req.body.visually;
    const experience = req.body.experience;
    const message = req.body.message;
    const service = req.body.service;

    const newAddFeedback = new AddFeedback({
        uname, notifications, visually, experience, message, service
    })

    newAddFeedback.save().then(() => {
        res.json("Feedback Sent!")
    }).catch((err) => {
        console.log(err);
    })
})

http://localhost:8090/feedback/

router.route("/").get((req,res) => {

    AddFeedback.find().then((feedback) => {
        res.json(feedback)
    }).catch((err) => {
        console.log(err);
    })
})

http://localhost:8090/feedback/update/userid

router.route("/update/:id").put(async(req,res) => {
    let userid = req.params.id;
    const { uname, notifications, visually, experience, message, service } = req.body;

    const updateFeedback = {
        uname, notifications, visually, experience, message, service
    }

    const update = await AddFeedback.findByIdAndUpdate(userid, updateFeedback)
    .then(() => {
        res.status(200).send({status: "Feedback Updated!"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating feedback!", error: err.message})
    })
})

http://localhost:8090/feedback/delete/userid

router.route("/delete/:id").delete(async(req,res) => {
    let userid = req.params.id;

    await AddFeedback.findByIdAndDelete(userid)
    .then(() => {
        res.status(200).send({status: "Feedback Deleted!"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting feedback!", error: err.message})
    })
}) 

http://localhost:8090/feedback/get/userid

router.route("/get/:id").get(async(req,res) => {
    let userid = req.params.id;

    const user = await AddFeedback.findById(userid)
    .then((user) => {
        res.status(200).send({status: "User feedback fetched", user})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with get feedback!", error: err.message})
    })
})

module.exports = router;

