const router = require("express").Router();
let Attendance = require("../models/attendance");
let Employee = require("../models/employee");
// const LastExecution = require('../models/lastExecution');
const cron = require('node-cron');

// async function initLastExecutionRecord() {
//     // const count = await LastExecution.countDocuments({});
//     const count = await LastExecution.countDocuments({}).maxTimeMS(30000); // increase timeout to 30 seconds
//     if (count === 0) {
//         await LastExecution.create({ lastExecution: null });
//     }
// }
// initLastExecutionRecord()

// async function executeOncePerDay() {
//     const current = new Date();
//     const lastExecutionRecord = await LastExecution.findOne().maxTimeMS(60000);
//     const lastExecution = lastExecutionRecord.lastExecution;

//     if (lastExecution === null || lastExecution.getDate() !== current.getDate()) {
//         // Execute function here
//         console.log('Executing function...');

//         // Update last execution time in database
//         lastExecutionRecord.lastExecution = current;
//         await lastExecutionRecord.save();
//     } else {
//         console.log('Function already executed today');
//     }
// }
// executeOncePerDay()

// cron.schedule('0 0 * * *', executeOncePerDay);


router.route("/all").post((req, res) => {
    const attendanceData = req.body;
  
    const newAttendance = attendanceData.map((data) => {
      const { name, employeeId, status, date, time_in, time_out } = data;
  
      return new Attendance({
        name,
        employeeId,
        status,
        date,
        time_in,
        time_out,
      });
    });
  
    Attendance.insertMany(newAttendance)
      .then(() => {
        res.json("Attendance Added!");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Error occurred while adding attendance");
      });
  });
  

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const employeeId = req.body.employeeId;
    const status = req.body.status;
    const date = req.body.date;
    const time_in = req.body.time_in;
    const time_out = req.body.time_out;

    const newAttendance = new Attendance({
        name,
        employeeId,
        status,
        date,
        time_in,
        time_out,

    })

    newAttendance.save().then(() => {
        res.json("Attendance Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Attendance.find().then((attendances) => {
        res.json(attendances)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, employeeId, status, date, time_in, time_out } = req.body; // names in front end
    const updateAttendance = {
        name,
        employeeId,
        status,
        date,
        time_in,
        time_out
    }

    const update = await Attendance.findByIdAndUpdate(userId, updateAttendance).then(() => {
        res.status(200).send({ status: "Now updated" });//for success
    }).catch((err) => {
        res.status(500).send({ status: "Error with updating details !!!" });
    })



})



//QR update part
router.route("/updateAttendance/out/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { time_out, date } = req.body; // names in front end
    const updateAttendance = {
        employeeId: userId,
        time_out,
    }
    // db.users.findOneAndUpdate({ email: "example@email.com" }, { $set: { age: 30 } }, { returnOriginal: false } )
    const update = await Attendance.findOneAndUpdate({ employeeId: userId, date: date  }, { $set: { time_out: time_out } }, { returnOriginal: false }).then(() => {
        res.status(200).send({ status: "updated" });//for success
    }).catch((err) => {
        res.status(500).send({ status: "Error with updating details !!!" });
    })



})


//QR update part
router.route("/updateAttendance/in/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { time_in, status, date } = req.body; // names in front end
    const updateAttendance = {
        employeeId: userId,
        time_in,
        status,
    }
    // db.users.findOneAndUpdate({ email: "example@email.com" }, { $set: { age: 30 } }, { returnOriginal: false } )
    const update = await Attendance.findOneAndUpdate({ employeeId: userId, date: date },{ $set: { time_in: time_in, status: status } }, { returnOriginal: false }).then(() => {
        res.status(200).send({ status: "updated" });//for success
    }).catch((err) => {
        res.status(500).send({ status: "Error with updating details !!!" });
    })



})




router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Attendance.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted" });
    }).catch((err) => {
        res.status(500).send({ status: "Error with delete user !!!" });
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Attendance.findById(userId)
        .then((attendance) => {
            res.status(200).send({ status: "User Fetched!", attendance });
        }).catch((error) => {
            // console.log(err.message);
            res.status(500).send({ status: "Error with get user" });
        })
})

router.route("/add/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Employee.findById(userId)
        .then((employee) => {
            res.status(200).send({ status: "User Fetched!", employee });
        }).catch((error) => {
            // console.log(err.message);
            res.status(500).send({ status: "Error with get user" });
        })
})

module.exports = router;