import React, { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import Sweetalert2 from 'sweetalert2';
import logo from '../../components/images/logo.png';
import AppointmentValidator from "./AppointmentValidations";


export default function UserMakeLabApmt() {

  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [age, setAge] = useState("");
  const [testType, setTestType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");



  const navigate = useNavigate();

  const sendData = (e) => {

    const newLabApmt = {
      patientId,
      patientName,
      contactNumber,
      age,
      testType,
      date,
      time,
      email

    }
    const { errors, isInvalid } = AppointmentValidator(newLabApmt);

    if (isInvalid) {
      setErrors(errors)
      Sweetalert2.fire({
        toast: true,
        position: 'top-',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Please Enter Valid details!',
      });
      // window.location.reload();
    } else {
      setErrors(errors)
      axios.post("http://localhost:4500/newLabApmt/lab_add", newLabApmt).then((response) => {
        if (response.data.status === 200) {
          Sweetalert2.fire({
            title: "Success!",
            text: `${response.data.message}`,
            icon: "success",
            confirmButtonText: "Success!, Download the 'PDF'",
            confirmButtonColor: "#3085d6",
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              console.log("work here")

              generatePDF([{
                "patientId": newLabApmt.patientId,
                "patientName": newLabApmt.patientName,
                "contactNumber": newLabApmt.contactNumber,
                "age": newLabApmt.age,
                "testType": newLabApmt.testType,
                "date": newLabApmt.date,
                "time": newLabApmt.time,
                "email": newLabApmt.email
              }]);
              setTimeout(() => {
                navigate('/');
              }, 2000)
            }
          })
        }
        setPatientId("");
        setPatientName("");
        setContactNumber("");
        setAge("");
        setTestType("");
        setDate("");
        setTime("");
        setEmail("");




      }).catch((err) => {
        alert(err)
      })
    }


  }


  const generatePDF = (appointmentDetails) => {
    // Define the table styles
    const tableStyles = {
      theme: 'grid',
      tableLineColor: [189, 195, 199],
      tableLineWidth: 0.2,
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
      },
        bodyStyles: {
        fontSize: 10,
        textColor: [44, 62, 80],
      },
    };

    const specialElementHandlers = {
      '.no-export': function (element, renderer) {
        return true;
      }
    };
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.text(305, 30, 'Lab Appointment Details', 'center');

    // Add the logo
    const imgData = logo;
    doc.addImage(imgData, 'png', 50, 0, 60, 40);//from left,from top,horizontal size,vertical size
    doc.output('data_url');

    const head = [['patientId', 'Patient Name', 'Contact Number',
      'Age', 'TestType', 'Date', 'Time', 'Email']];

    const elements = appointmentDetails.map(appointment => [appointment.patientId, appointment.patientName, appointment.contactNumber,
    appointment.age, appointment.testType, appointment.date, appointment.time, appointment.email]);

    autoTable(doc, {
      head: head,
      body: elements,
      styles: tableStyles, // Apply the table styles
    })
    doc.save("My_New_Lab_Appointment.pdf");
  }

      // Date Input Validation
      const getCurrentDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      }
      
      const getMaxDate = () => {
        const today = new Date();
        const maxDate = new Date(today.setDate(today.getDate() + 30)); // Add 30 days to today's date
        const month = maxDate.getMonth() + 1;
        const day = maxDate.getDate();
        const year = maxDate.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      }
      

      //email validation
      const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }


       //Contact number validation
       const [invalidNumber, setInvalidNumber] = useState(false);
       const [invalidNumberLength, setInvalidNumberLength] = useState(false);
       const [invalidNumberStart, setInvalidNumberStart] = useState(false);
       const handleInputChange = (e) => {
         setContactNumber(e.target.value);
         if (!/^[0-9]{10}$/.test(e.target.value)) {
           setInvalidNumber(true);
         } else {
           setInvalidNumber(false);
         }
         
         if (e.target.value.length !== 10) {
           setInvalidNumberLength(true);
         } else {
           setInvalidNumberLength(false);
         }
         
         if (e.target.value.length > 0 && e.target.value.charAt(0) !== '0') {
           setInvalidNumberStart(true);
         } else {
           setInvalidNumberStart(false);
         }
         };



  return (

    <div className="form-container1">
      <h1>Make Lab Appointment</h1>
      <form>

        {/*patient ID input*/}
        <div className="form-container">
        <label htmlFor="patientID">Patient ID</label>
        <input 
          type="text"
          className={`form-control`} 
          id="patientId"
          name="patientId"
          placeholder="Enter PID Here"
          minLength={7}
          maxLength={7} 
          required
          value={patientId} 
          onChange={(e) => setPatientId(e.target.value)} />
          <small
                id="patientId"
                className="d-block text-start text-danger form-text invalid-feedback"
              >
                {errors.patientId}
              </small>
      </div>


        {/*patient Name input*/}
        <div className="form-container">
        <label htmlFor="patientName">Patient Name</label>
        <input 
          type="text" 
          className={`form-control`} 
          id="patientName" 
          placeholder="Enter patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required 
        />
        <small
                id="patientName"
                className="d-block text-start text-danger form-text invalid-feedback"
              >
                {errors.patientName}
              </small>
      </div>


        {/*patient Contact Number input*/}
        <div className="form-container">
        <label htmlFor="contactNumber">Contact Number</label>
        <input 
          type="tel" 
          className={`form-control ${(invalidNumber || invalidNumberLength || invalidNumberStart) ? 'is-invalid' : ''}`} 
          id="contactNumber" 
          name="contactNumber" 
          placeholder="Enter Contact Number"
          pattern="[0-9]{10}"
          minLength={10}
          maxLength={10}
          required
          value={contactNumber}
          onChange={handleInputChange}
        />
        {invalidNumberLength && <div className="invalid-feedback">Contact number must be 10 digits long.</div>}
          {invalidNumberStart && <div className="invalid-feedback">Contact number must start with 0.</div>}
      </div>


        {/*patient Age input*/}
        <div className="form-container">
        <label htmlFor="age">Age</label>
        <input 
          type="number" 
          className="form-control" 
          id="age" 
          placeholder="Enter patient age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          maxLength={2}
          required
        />
      </div>


        {/*Test Type input*/}
        <div className="form-container">
          <label htmlFor="testType">Select the Test:</label>
          <button className="doctor dropdown-toggle" type="button" id="doctorDropdown" data-bs-toggle="dropdown" aria-expanded="false" required>
            {testType ? testType : "Click to Select"}

          </button>
          <ul className="dropdown-menu" aria-labelledby="doctorDropdown">
            <li><a className="dropdown-item" onClick={() => setTestType("MRI")}>MRI</a></li>
            <li><a className="dropdown-item" onClick={() => setTestType("CT")}>CT</a></li>
            <li><a className="dropdown-item" onClick={() => setTestType("PET")}>PET</a></li>
            <li><a className="dropdown-item" onClick={() => setTestType("URINE")}>URINE</a></li>
            <li><a className="dropdown-item" onClick={() => setTestType("BLOOD")}>BLOOD</a></li>
          </ul>
        </div>


        {/*Date input*/}
        <div className="form-container">
          <label htmlFor="date-input">Select a date:</label>
          <input type="date" id="date-input" name="date-input"
            min={getCurrentDate()} // Set the minimum date to today
            max={getMaxDate()} // Set the maximum date to 30 days from today
            onChange={(e) => {

              setDate(e.target.value);

            }}
            required />
        </div>


        {/*Time-Slot input*/}
        <div className="form-container">
          <label htmlFor="time">Select Your Prefered Time-Slot:</label>
          <button className="doctor dropdown-toggle" type="button" id="timeDropdown" data-bs-toggle="dropdown" aria-expanded="false" required>
            {time ? time : "Click to Select"}

          </button>
          <ul className="dropdown-menu" aria-labelledby="timeDropdown">
            <li><a className="dropdown-item" onClick={() => setTime("07.00am - 09.00am")}>07.00am - 09.00am</a></li>
            <li><a className="dropdown-item" onClick={() => setTime("09.00am - 11.00am")}>09.00am - 11.00am</a></li>
            <li><a className="dropdown-item" onClick={() => setTime("06.00pm - 08.00pm")}>06.00pm - 08.00pm</a></li>
          </ul>
        </div>


        {/*Patient Email input*/}
        <div className="form-container">
          <label htmlFor="email">Patient's Email Address</label>
          <input 
          type="text" 
          className="form-control" 
          id="email" 
          placeholder="Enter patient email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={(e) => {
              if (!validateEmail(e.target.value)) {
                alert("Please enter a valid email address");
                setEmail("");
              }
            }}
            required
          />
        </div><br></br>


        </form>

        <div className="form-container">

          {/*Cancel button */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              navigate('/appointments/scheduler');
            }}
          >Cancel
          </button>


          {/*Submit button */}
          <button
            
            className="btn btn-primary"
            onClick={() => {
              sendData();
              
            }}
          >
            Submit
          </button>
        </div>


          {/*Doc Apmts navigation button */}
        <div className="button-container">
          <button type="button" 
          className="button" 
          onClick={() => {
            navigate('/appointments/add');
          }}
          >Doctor Appointment</button>
        </div>
      
    </div>
)
}
