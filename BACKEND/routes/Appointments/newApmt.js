const router = require("express").Router();
let Apmt = require("../../models/Appointments/newDocApmt");


//Adding new Doc appointment
router.route("/add").post((req, res) => {
    const patientId = req.body.patientId;
    const patientName = req.body.patientName;
    const contactNumber = Number(req.body.contactNumber);
    const age = Number(req.body.age);
    const doctor = req.body.doctor;
    const date = req.body.date;
    const time = req.body.time;
    const email = req.body.email;


    const newApmt = new Apmt({

        patientId,
        patientName,
        contactNumber,
        age,
        doctor,
        date,
        time,
        email
    })

    newApmt.save().then(() => {
        res.json({
            message: "New Doctor Appointment Added!",
            status: 200
        })
    }).catch((err) => {
        console.log(err);
    })
})





//show all the data
router.route("/").get((req, res) => {
    Apmt.find().then((Apmts) => {
        res.json(Apmts)
    }).catch((err) => {
        console.log(err)
    })
})



//Update Appointments
router.route("/update/:id").put(async (req, res) => {
    let ApmtId = req.params.id;

    //D structure
    const { patientId, patientName, contactNumber, age, doctor, date, time, email } = req.body;

    const updateApmt = {
        patientId,
        patientName,
        contactNumber,
        age,
        doctor,
        date,
        time,
        email
    }

    const update = await Apmt.findByIdAndUpdate(ApmtId, updateApmt)
        .then(() => {
            res.status(200).send({ status: "Appointment updated!" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating the Appointment!", error: err.message });
        })
})



//Delete Appointments
router.route("/delete/:id").delete(async (req, res) => {
    let ApmtId = req.params.id;

    await Apmt.findByIdAndDelete(ApmtId)
        .then((deletedApmt) => {
            res.status(200).send({ status: "Appointment deleted!", Apmt: deletedApmt });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with deleting the Appointment!", error: err.message });
        });
})



//Fetch an appointment
router.route("/get/:id").get(async (req, res) => {
    let ApmtId = req.params.id;
    const apmt = await Apmt.findById(ApmtId)
        .then((Apmt) => {
            res.status(200).send({ status: "Appointment fetched!", Apmt })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching appointment!", error: err.message });
        })
})


module.exports = router;
