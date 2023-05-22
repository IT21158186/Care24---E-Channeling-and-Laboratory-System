import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import Sweetalert2 from 'sweetalert2';
import logo from '../../components/images/logo.png';

export default function UpdateDocApmt() {

    const [patientId, setPatientId] = useState("");
    const [patientName, setPatientName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [age, setAge] = useState("");
    const [testType, setTestType] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();
    const [updateApmt, setUpdateApmt] = useState({
        patientId: '',
        patientName: '',
        contactNumber: '',
        age: '',
        doctor: '',
        date: '',
        time: '',
        email: ''
    });


    //Fetch data
    useEffect(() => {
        getUpdateApmt();
    }, []);


    function getUpdateApmt() {
        axios.get("http://localhost:4500/newApmt/get/" + id)
            .then((res) => {
                console.log(res);
                setUpdateApmt({
                    patientId: res.data.Apmt.patientId,
                    patientName: res.data.Apmt.patientName,
                    contactNumber: res.data.Apmt.contactNumber,
                    age: res.data.Apmt.age,
                    doctor: res.data.Apmt.doctor,
                    date: res.data.Apmt.date,
                    time: res.data.Apmt.time,
                    email: res.data.Apmt.email
                });

            }).catch((err) => {
                alert(err.message);
            })
    }

    const handleChange = (e) => {
        setUpdateApmt({
            ...updateApmt,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(stock); // or save the data to your backend
        axios.put('http://localhost:4500/newApmt/update/' + id, updateApmt)
            .then((response) => {
                console.log(response.data.status)
                if (response.data.status === "Appointment updated!") {

                    Sweetalert2.fire({
                        title: "Success!",
                        text: "Doctor Appointment Updated Successfully!",
                        icon: "success",
                        confirmButtonText: "Success!, Download the 'PDF'",
                        confirmButtonColor: "#3085d6",
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {

                            console.log("work here")

                            generatePDF([{
                                "_id": id,
                                "patientId": updateApmt.patientId,
                                "patientName": updateApmt.patientName,
                                "contactNumber": updateApmt.contactNumber,
                                "age": updateApmt.age,
                                "doctor": updateApmt.doctor,
                                "date": updateApmt.date,
                                "time": updateApmt.time,
                                "email": updateApmt.email
                            }]);


                            console.log("work here 01")


                            setTimeout(() => {
                                navigate('/appointments/scheduler');
                            }, 2000)
                        }
                    })

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


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
    
        doc.text(305, 30, 'Updated Doctor Appointment Details', 'center');
    
        // Add the logo
        const imgData = logo;
        doc.addImage(imgData, 'png', 50, 0, 60, 40);//from left,from top,horizontal size,vertical size
        doc.output('data_url');
    
        const head = [['patientId', 'Patient Name', 'Contact Number',
            'Age', 'Doctor', 'Date', 'Time', 'Email']];
    
        const elements = appointmentDetails.map(appointment => [appointment.patientId, appointment.patientName, appointment.contactNumber,
        appointment.age, appointment.doctor, appointment.date, appointment.time, appointment.email]);
    
        autoTable(doc, {
            head: head,
            body: elements,
            styles: tableStyles, // Apply the table styles
        })
        doc.save("My-updated-doctor-appointment.pdf");
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
            const value = e.target.value;
            setUpdateApmt({
            ...updateApmt,
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



        //Patient ID validation
        const [invalidIDNumber, setInvalidIDNumber] = useState(false);
        const [invalidIDStart, setInvalidIDStart] = useState(false);
        
        const handleIDInputChange = (e) => {
          setPatientId(e.target.value);
          if (!/^PID\d{4}$/.test(e.target.value)) {
            setInvalidIDNumber(true);
          } else {
            setInvalidIDNumber(false);
            if (!/^PID/.test(e.target.value)) {
              setInvalidIDStart(true);
            } else {
              setInvalidIDStart(false);
            }
          }
        };

        
        const handleFormSubmit = (event) => {
          event.preventDefault();
          if (invalidIDNumber || invalidIDStart || patientId === '') {
            // Don't submit the form if there is an error message or if patientId is empty
            return;
          }
          
        };



           //Patient Name validation
        const [invalidName, setInvalidName] = useState(false);
        const handleNameInputChange = (e) => {
          const inputValue = e.target.value;
          setPatientName(inputValue);
          if (!/^[a-zA-Z]+$/.test(inputValue)) {
            setInvalidName(true);
          } else {
            setInvalidName(false);
          }
        }


    return (

        <div className="form-container1">
            <h1>Update Doctor Appointment</h1>

            <form onSubmit={handleSubmit} >

                {/*patient ID input*/}
                <div className="form-container">
        <label htmlFor="patientID">Patient ID</label>
        <input 
          type="text"
          className={`form-control ${invalidIDNumber || invalidIDStart ? "is-invalid" : ""}`} 
          id="patientId"
          name="patientId"
          placeholder="Enter PID Here"
          minLength={7}
          maxLength={7} 
          required
          readOnly={true}
                    value={updateApmt.patientId}
                        onChange={(e) => {
                            setUpdateApmt({
                                ...updateApmt,
                                patientId: e.target.value,
                            });

                        }} />
                        {invalidIDNumber && <div className="invalid-feedback">Invalid patient ID. It should start with PID followed by 4 digits.</div>}
        {invalidIDStart && <div className="invalid-feedback">Patient ID should start with PID.</div>}

                </div>


                {/*patient Name input*/}
                <div className="form-container">
                    <label for="patientName">Patient Name</label>
                    <input type="text" className="form-control" id="patientName" placeholder="Enter patient Name" value={updateApmt.patientName}
                        onChange={(e) => {
                            setUpdateApmt({
                                ...updateApmt,
                                patientName: e.target.value,
                            });

                        }} required 
                        readOnly={true}/>
                </div>


                {/*patient Contact Number input*/}
                <div className="form-container">
                    <label for="contactNumber">Contact Number</label>
                    <input 
                    type="text" 
                    className={`form-control ${(invalidNumber || invalidNumberLength || invalidNumberStart) ? 'is-invalid' : ''}`} 
                    id="contactNumber" 
                    name="contactNumber" 
                    placeholder="Enter Contact Number"
                    pattern="[0-9]{10}"
                    minLength={10}
                    maxLength={10}
                    value={updateApmt.contactNumber}
                        onChange={handleInputChange}

                        required/>
                {invalidNumberLength && <div className="invalid-feedback">Contact number must be 10 digits long.</div>}
                {invalidNumberStart && <div className="invalid-feedback">Contact number must start with 0.</div>}
                </div>


                {/*patient Age input*/}
                <div className="form-container">
                    <label for="age">Age</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter patient Age"pattern="[0-9]{2}" value={updateApmt.age}
                        onChange={(e) => {

                            setUpdateApmt({
                                ...updateApmt,
                                age: e.target.value,
                            });

                        }} required />
                </div>


                {/*Doctor Name input*/}
                <div className="form-container">
                    <label htmlFor="doctor">Select the Doctor:</label>
                    <div className="col">
                        <select name="type" value={updateApmt.doctor} className="form-select" aria-label="role" required

                            onChange={(e) => {
                                setUpdateApmt({
                                    ...updateApmt,
                                    doctor: e.target.value,
                                });
                            }}
                        >
                            <option value="Mr.Kannangara B.M.A">Mr.Kannangara B.M.A</option>
                            <option value="Mr.Kalupahana S.T">Mr.Kalupahana S.T</option>
                            <option value="Mr.Premil Rajakrishna" >Mr.Premil Rajakrishna</option>
                            <option value="Mrs.Vinodani Sepalika Abekoon">Mrs.Vinodani Sepalika Abekoon</option>
                            <option value="Mr.Hapuhewa H.M.M">Mr.Hapuhewa H.M.M</option>
                        </select>
                    </div>
                </div>



                {/*Date input*/}
                <div className="form-container">
                    <label htmlFor="date-input">Select a date:</label>
                    <input type="date" id="date-input" name="date-input" value={updateApmt.date} className="form-control"
                        min={getCurrentDate()} // Set the minimum date to today
                        max={getMaxDate()} // Set the maximum date to 30 days from today
                        onChange={(e) => {

                            setUpdateApmt({
                                ...updateApmt,
                                date: e.target.value,
                            });

                        }} required/>
                </div>


                {/*Time-Slot input*/}
                <div className="form-container">
                    <label htmlFor="time">Select Your Prefered Time-Slot:</label>
                    <div className="col">
                        <select name="type" value={updateApmt.time} className="form-select" aria-label="role" required

                            onChange={(e) => {
                                setUpdateApmt({
                                    ...updateApmt,
                                    time: e.target.value,
                                });
                            }}
                        >
                            <option value="01.00pm - 03.00pm">01.00pm - 03.00pm</option>
                            <option value="03.00pm - 05.00pm">03.00pm - 05.00pm</option>
                            <option value="05.00pm - 07.00pm" >05.00pm - 07.00pm</option>
                            <option value="07.00pm - 09.00pm">07.00pm - 09.00pm</option>
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
                    value={updateApmt.email}
                    onChange={(e) => {
                    setUpdateApmt({
                        ...updateApmt,
                        email: e.target.value
                    });
                    }}
                    onBlur={(e) => {
                    if (!validateEmail(e.target.value)) {
                        alert("Please enter a valid email address");
                        setUpdateApmt({
                        ...updateApmt,
                        email: ""
                        });
                    }
                    }}
                    required
                />
        </div><br></br>


                <button 
                type="submit" 
                className="btn btn-primary"
                >
                    Save
                </button>


                <Link to={'/appointments/scheduler'}>
                    <button 
                    className="btn btn-danger">
                        Cancel</button>
                </Link>
            </form>
        </div>

    )

}