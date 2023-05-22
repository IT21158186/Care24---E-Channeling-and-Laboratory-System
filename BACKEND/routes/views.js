const router = require("express").Router();
let View = require("../models/view");
let Attendance = require("../models/attendance");


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await View.findById(userId)
    .then((view) => {
        res.status(200).send({status: "User Fetched!", view});
    }).catch((error) => {
        // console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})



router.route("view/").get((req, res) => {
    Attendance.find().then((attendances) => {
        res.json(attendances)
    }).catch((err) => {
        // console.log(err)
    })
})

// router.route("/get/:id").get(async (req, res) => {
//     let userId = req.params.id;
//     const user = await Attendance.findById(userId)
//     .then((attendance) => {
//         res.status(200).send({status: "User Fetched!", attendance});
//     }).catch((error) => {
        // console.log(err.message);
//         res.status(500).send({status: "Error with get user"});
//     })
// })





module.exports = router;