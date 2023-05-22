import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import Sweetalert2 from 'sweetalert2';

export default function UpdateLabApmt() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [updateLabApmt, setUpdateLabApmt] = useState({
        patientId: '',
        patientName: '',
        contactNumber: '',
        age: '',
        testType: '',
        date: '',
        time:'',
        email: ''
    });


    //Fetch data
    useEffect(() => {
        getupdateLabApmt();
    }, []);


    function getupdateLabApmt() {
        axios.get("http://localhost:4500/newLabApmt/lab_get/" + id)
            .then((res) => {
                console.log(res);
                setUpdateLabApmt({
                    patientId: res.data.LabApmt.patientId,
                    patientName: res.data.LabApmt.patientName,
                    contactNumber: res.data.LabApmt.contactNumber,
                    age: res.data.LabApmt.age,
                    testType: res.data.LabApmt.testType,
                    date: res.data.LabApmt.date,
                    time: res.data.LabApmt.time,
                    email: res.data.LabApmt.email
                });

            }).catch((err) => {
                alert(err.message);
            })
    }

    const handleChange = (e) => {
        setUpdateLabApmt({
            ...updateLabApmt,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(stock); // or save the data to your backend
        axios.put('http://localhost:4500/newLabApmt/lab_update/' + id, updateLabApmt)
        .then((response) => {
            console.log(response.data.status)
            if (response.data.status === "Lab Appointment updated!") {

                Sweetalert2.fire({
                    title: "Success!",
                    text: "Lab Appointment Updated Successfully!",
                    icon: "success",
                    confirmButtonText: "Success!, Download the 'PDF'",
                    confirmButtonColor: "#3085d6",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {

                        console.log("work here")

                        generatePDF([{
                            "_id": id,
                            "patientId": updateLabApmt.patientId,
                            "patientName": updateLabApmt.patientName,
                            "contactNumber": updateLabApmt.contactNumber,
                            "age": updateLabApmt.age,
                            "testType": updateLabApmt.testType,
                            "date": updateLabApmt.date,
                            "time": updateLabApmt.time,
                            "email": updateLabApmt.email
                        }]);


                        console.log("work here 01")


                        setTimeout(() => {
                            navigate('/scheduler');
                        }, 2000)
                    }
                })

            }
        })
            .catch((error) => {
                console.log(error);
            });
    };


    const generatePDF = (labAppointmentDetails) => {
        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

        doc.text(305, 20, 'Updated Lab Appointment Details', 'center');

        const head = [['patientId', 'Patient Name', 'Contact Number',
            'Age', 'Test Type', 'Date', 'Time', 'Email']];
        const elements = labAppointmentDetails.map(labAppointment => [labAppointment.patientId, labAppointment.patientName, labAppointment.contactNumber,
        labAppointment.age, labAppointment.testType, labAppointment.date, labAppointment.time, labAppointment.email]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("My-updated-lab-Appointment.pdf");
    }
        
    
    //Email validation
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }


    
    //--Date Input Validation Start here--
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
  
  
      //Contact number validation
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [invalidNumberLength, setInvalidNumberLength] = useState(false);
  const [invalidNumberStart, setInvalidNumberStart] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUpdateLabApmt({
      ...updateLabApmt,
      [e.target.name]: value,
    });

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
            <h1>Update Lab Appointment</h1>

            <form onSubmit={handleSubmit} >

                {/*patient ID input*/}
                <div className="form-container">
                    <label for="patientId">Patient ID</label>
                    <input type="text" className="form-control" id="patientId" placeholder="Enter patient Id" value={updateLabApmt.patientId}
                        onChange={(e) => {
                            setUpdateLabApmt({
                                ...updateLabApmt,
                                patientId: e.target.value,
                            });

                        }} 
                        required
                        readOnly={true}/>

                </div>


                {/*patient Name input*/}
                <div className="form-container">
                    <label for="patientName">Patient Name</label>
                    <input type="text" className="form-control" id="patientName" placeholder="Enter patient Name" value={updateLabApmt.patientName}
                        onChange={(e) => {
                            setUpdateLabApmt({
                                ...updateLabApmt,
                                patientName: e.target.value,
                            });

                        }} 
                        readOnly={true}
                        required />
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
                    value={updateLabApmt.contactNumber}
                    onChange={handleInputChange}
                required/>
                {invalidNumberLength && <div className="invalid-feedback">Contact number must be 10 digits long.</div>}
                {invalidNumberStart && <div className="invalid-feedback">Contact number must start with 0.</div>}
                </div>


                {/*patient Age input*/}
                <div className="form-container">
                    <label for="age">Age</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter patient Age" value={updateLabApmt.age}
                        onChange={(e) => {

                            setUpdateLabApmt({
                                ...updateLabApmt,
                                age: e.target.value,
                            });

                        }} 
                        readOnly={true}
                        required/>
                </div>


                {/*Test Type input*/}
                <div className="form-container">
                    <label htmlFor="testType">Select the Test Type:</label>
                    <div className="col">
                        <select name="type" value={updateLabApmt.testType} className="form-select" aria-label="role"

                            onChange={(e) => {
                                setUpdateLabApmt({
                                    ...updateLabApmt,
                                    testType: e.target.value,
                                });
                            }}
                        >
                            <option value="MRI">MRI</option>
                            <option value="CT">CT</option>
                            <option value="PET" >PET</option>
                            <option value="URINE">URINE</option>
                            <option value="BLOOD">BLOOD</option>
                        </select>
                    </div>
                </div>



                {/*Date input*/}
                <div className="form-container">
                    <label htmlFor="date-input">Select a date:</label>
                    <input type="date" id="date-input" name="date-input" value={updateLabApmt.date} className="form-control"
                        min={getCurrentDate()} // Set the minimum date to today
                        max={getMaxDate()} // Set the maximum date to 30 days from today
                        onChange={(e) => {

                            setUpdateLabApmt({
                                ...updateLabApmt,
                                date: e.target.value,
                            });

                        }}required />
                </div>


                {/*Time-Slot input*/}
                <div className="form-container">
                    <label htmlFor="time">Select Your Prefered Time-Slot:</label>
                    <div className="col">
                        <select name="type" value={updateLabApmt.time} className="form-select" aria-label="role"

                            onChange={(e) => {
                                setUpdateLabApmt({
                                    ...updateLabApmt,
                                    time: e.target.value,
                                });
                            }}
                        >
                            <option value="07.00am - 09.00am">07.00am - 09.00am</option>
                            <option value="09.00am - 11.00am">09.00am - 11.00am</option>
                            <option value="06.00pm - 08.00pm" >06.00pm - 08.00pm</option>
                        </select>
                    </div>
                </div>

         
         {/*patient Email input*/}
                <div className="form-container">
                <label htmlFor="email">Patient's Email Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter patient email address"
                    value={updateLabApmt.email}
                    onChange={(e) => {
                    setUpdateLabApmt({
                        ...updateLabApmt,
                        email: e.target.value
                    });
                    }}
                    onBlur={(e) => {
                    if (!validateEmail(e.target.value)) {
                        alert("Please enter a valid email address");
                        setUpdateLabApmt({
                        ...updateLabApmt,
                        email: ""
                        });
                    }
                    }}
                    required
                />
                </div><br></br>


                    <button type="submit" 
                    className="btn btn-primary">
                    Save
                    </button>


                <Link to={'/scheduler'}>
                <button 
                className="btn btn-danger">
                Cancel</button>
                </Link>
            </form>
        </div>

    )

}
