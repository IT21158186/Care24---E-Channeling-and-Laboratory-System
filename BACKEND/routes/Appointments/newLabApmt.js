const router = require("express").Router();
let LabApmt = require("../../models/Appointments/newLabApmt");


//Adding new Lab appointment
router.route("/lab_add").post((req,res)=>{
    const patientId = req.body.patientId;
    const patientName = req.body.patientName;
    const contactNumber = Number(req.body.contactNumber);
    const age = Number(req.body.age);
    const testType = req.body.testType;
    const date = req.body.date;
    const time = req.body.time;
    const email = req.body.email;
    

    const newLabApmt = new LabApmt({

        patientId,
        patientName,
        contactNumber,
        age,
        testType,
        date,
        time,
        email
    })

    newLabApmt.save().then(()=>{
        res.json({
            message:"New Lab Appointment Added!",
            status:200
        })
    }).catch((err)=>{
        console.log("err");
    })

})


//show all the data
router.route("/labAll").get((req,res)=>{
    LabApmt.find().then((LabApmts)=>{
    res.json(LabApmts)
    }).catch((err)=>{
    console.log(err)
    })
})



//Update Appointments
router.route("/lab_update/:id").put(async (req, res) => {
    let LabApmtId = req.params.id;
    
    //D structure
    const {patientId, patientName, contactNumber, age, testType, date, time, email} = req.body;

    const updateLabApmt = {
        patientId,
        patientName,
        contactNumber,
        age,
        testType,
        date,
        time,
        email
    }

    const update = await LabApmt.findByIdAndUpdate(LabApmtId, updateLabApmt)
    .then(() => {
        res.status(200).send({status: "Lab Appointment updated!"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating the Lab Appointment!", error: err.message});
    })   
})



//Delete Appointments
router.route("/lab_delete/:id").delete(async (req,res) => {
    let LabApmtId = req.params.id;

    await LabApmt.findByIdAndDelete(LabApmtId)
  .then((deletedLabApmt) => {
    res.status(200).send({status: "Appointment deleted!", LabApmt: deletedLabApmt});
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({status: "Error with deleting the Appointment!", error: err.message});
  });
})



//Fetch an appointment
router.route("/lab_get/:id").get(async (req, res) => {
    let LabApmtId = req.params.id;
    const user = await LabApmt.findById(LabApmtId)
      .then((LabApmt) => {
        res.status(200).send({status: "Appointment fetched!", LabApmt})
      }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetching appointment!", error: err.message});
    })
})


module.exports = router;
