const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors'); // React Package for Frontend to deal with Backend.
const pdf = require('html-pdf');
const dotenv = require("dotenv");
require("dotenv").config();

const userController  = require('./routes/UsersController');

const Attendance = require("./models/attendance");

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
  

//import routes
const MedicineRequestRoutes = require("./routes/MedicineDeliveryManagement/MedicineRequests");
const DeliveryStageRoute = require("./routes/MedicineDeliveryManagement/DeliveryProcess");

//const FileUpRoute = require("./routes/NewMediReqwithFile");


//app middleware
app.use(bodyParser.json());
//app.use(cors());
//  POST http://localhost:4500/newmedicinerequestWithFile/create net::ERR_FAILED 413 (Payload Too Large)
app.use(cors({
    origin: "http://localhost:3000",
  }));
  

//route middleware
app.use(MedicineRequestRoutes);
app.use(DeliveryStageRoute);

//app.use(FileUpRoute);


const neworderRouter = require("./routes/neworders.js");
const newdispatchOrderRouter = require("./routes/dispatches.js");

app.use("/neworder",neworderRouter);
app.use("/newdispatch",newdispatchOrderRouter);




//Appointments start
const ApmtRouter = require("./routes/Appointments/newApmt.js");
const LabApmtRouter = require("./routes/Appointments/newLabApmt.js");

app.use("/newApmt", ApmtRouter);
app.use("/newLabApmt", LabApmtRouter);


//Feedback start
const contactusRouter = require("./routes/Feedback/contactus.js");
const addfeedbackRouter = require("./routes/Feedback/addfeedback.js");
const FAQsRouter = require("./routes/Feedback/faqs.js");

app.use("/contactus", contactusRouter);
app.use("/feedback", addfeedbackRouter);
app.use("/faqs", FAQsRouter);




//employee.js
const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);

const payrollRouter = require("./routes/payrolls.js");
app.use("/payroll", payrollRouter);

const attendanceRouter = require("./routes/attendances.js");
app.use("/attendance", attendanceRouter);

const leaveRouter = require("./routes/leaves.js");
app.use("/leave", leaveRouter);

const viewRouter = require("./routes/views.js");
// const Attendance = require("./models/attendance.js");
app.use("/view", viewRouter);



const AddSampleRequestRoutes = require("./routes/AddSample");
const ResultRequestRoutes=require("./routes/Result");

app.use(AddSampleRequestRoutes);
app.use(ResultRequestRoutes);


const userRoutes = require('./routes/users');
app.use(userRoutes);


const invoiceRouter = require("./routes/invoice.js");
app.use("/invoice", invoiceRouter);

const customerRouter = require("./routes/customer.js");
app.use("/customer", customerRouter);

const catalogRouter = require("./routes/catalog.js");
app.use("/catalog", catalogRouter);



app.post('/signup', userController.signup)
app.post('/signin', userController.signin)
app.get('/getUsers', userController.GetUsers)

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_DB_Connection)
.then(()=>{
    console.log("Mongoose connected.");
    app.listen(PORT, ()=> {
        console.log(`Server is Running on Port ${PORT}`);
    });
});
const connection = mongoose.connection;