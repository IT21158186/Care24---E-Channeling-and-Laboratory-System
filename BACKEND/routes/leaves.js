const router = require("express").Router();
let Leave = require("../models/leave");
let Employee = require("../models/employee");

router.route("/add").post((req, res) => {
    const employeeId = req.body.employeeId;
    const date = req.body.date;
    const type = req.body.type;
    const remarks = req.body.remarks;
    const status = req.body.status;

    const newLeave = new Leave({
        employeeId,
        date,
        type,
        remarks,
        status
    })

    newLeave.save().then(() => {
        res.json("Leave Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Leave.find().then((leaves) => {
        res.json(leaves)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/updateStatus/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {status} = req.body; // names in front end
    const updateLeave = {
        status
    }

    const update = await Leave.findByIdAndUpdate(userId, updateLeave).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {employeeId,date,type,remarks} = req.body; // names in front end
    const updateLeave = {
        employeeId,
        date,
        type,
        remarks,
        status
    }

    const update = await Leave.findByIdAndUpdate(userId, updateLeave).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Leave.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Leave.findById(userId)
    .then((leave) => {
        res.status(200).send({status: "User Fetched!", leave});
    }).catch((error) => {
        // console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

router.route("/add/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Employee.findById(userId)
    .then((employee) => {
        res.status(200).send({status: "User Fetched!", employee});
    }).catch((error) => {
        // console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

module.exports = router;