const router = require("express").Router();
let Payroll = require("../models/payroll");
let Employee = require("../models/employee");

router.route("/add").post((req, res) => {
    const employeeId = req.body.employeeId;
    const name = req.body.name;
    const salary = Number(req.body.salary);
    const casual_leave = Number(req.body.casual_leave);
    const medical_leave = Number(req.body.medical_leave);
    const bonus = Number(req.body.bonus);
    const tax = Number(req.body.tax);


    const newPayroll = new Payroll({
        employeeId,
        name,
        salary,
        casual_leave,
        medical_leave,
        bonus,
        tax
    })

    newPayroll.save().then(() => {
        res.json("Payroll Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Payroll.find().then((payrolls) => {
        res.json(payrolls)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {employeeId, name, salary,  casual_leave, medical_leave,bonus,tax} = req.body; // names in front end
    const updatePayroll = {
        employeeId,
        name,
        salary,
        casual_leave,
        medical_leave,
        bonus,
        tax
    }

    const update = await Payroll.findByIdAndUpdate(userId, updatePayroll).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Payroll.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Payroll.findById(userId)
    .then((payroll) => {
        res.status(200).send({status: "User Fetched!", payroll});
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