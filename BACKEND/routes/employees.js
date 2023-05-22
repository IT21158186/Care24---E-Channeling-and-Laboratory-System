const router = require("express").Router();
let Employee = require("../models/employee");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const mobileNo = req.body.mobileNo;
    const nic = req.body.nic;
    const dob = req.body.dob;
    const email = req.body.email;
    const gender = req.body.gender;
    const leaveLimit = Number(req.body.leaveLimit);
    const password = req.body.password;

    const newEmployee = new Employee({
        name,
        address,
        mobileNo,
        nic,
        dob,
        email,
        gender,
        leaveLimit,
        password


    })

    newEmployee.save().then(() => {
        res.json("Employee Added!")
    }).catch((err) => {
        // console.log(err);
    })


})

router.route("/").get((req, res) => {
    Employee.find().then((employees) => {
        res.json(employees)
    }).catch((err) => {
        // console.log(err)
    })
})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {name, address,  mobileNo, nic,  dob,  email,  gender,  leaveLimit,  password} = req.body; // names in front end
    const updateEmployee = {
        name,
        address,
        mobileNo,
        nic,
        dob,
        email,
        gender,
        leaveLimit,
        password
    }

    const update = await Employee.findByIdAndUpdate(userId, updateEmployee).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Employee.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Employee.findById(userId)
    .then((employee) => {
        res.status(200).send({status: "User Fetched!", employee});
    }).catch((error) => {
        //console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

module.exports = router;