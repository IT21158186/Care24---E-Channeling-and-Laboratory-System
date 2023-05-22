import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddAttendance() {

    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [status, setAttendance] = useState("");
    const [date, setDate] = useState("");
    const [time_in, setTime_in] = useState("00:00");
    // const [time_in, setFinal] = useState(Date);
    const [final, setDateTime] = useState();
    const [time_out, setTime_out] = useState("00:00");
    const [employeeId, setId] = useState("");
    const [unique_val, setUnique_val] = useState("");
    useEffect(() => {

        if (params.id) {
            function getAttendance() {
                axios.get(`http://localhost:4500/attendance/add/get/${params.id}`).then((res) => {
                    setName(res.data.employee.name);
                    setId(res.data.employee._id);
                }).catch((error) => {
                    alert(error.message);

                })
            }

            getAttendance();
        }


    }, [])

    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        setUnique_val(date)
        alert(unique_val)
        const newAttendance = {
            name,
            employeeId,
            status,
            date,
            time_in,
            time_out,
            unique_val

        }
        // (time_in)alert
        // alert("Hi" + unique)
        axios.post("http://localhost:4500/attendance/add", newAttendance)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Attendance Added!",
                    confirmButtonText: "OK",
                    onConfirm: () => {

                    },
                }).then(() => navigate("/attendance/"))
            })
            .catch((error) => {
                if (error.code === 11000) {
                    alert("User is already exist!")
                    
                  } else {
                    alert("Failed to add attendance")
                  }
            })


    }


    // const handleDateTimeChange = (event) => {
    //     setDateTime(event.target.value);

    //     // Set the time of the selected date to the current time
    //     const currentDateTime = new Date();
    //     currentDateTime.setHours(time_in.getHours());
    //     currentDateTime.setMinutes(time_in.getMinutes());
    //     currentDateTime.setSeconds(time_in.getSeconds());

    //     setFinal(currentDateTime);
    // };


    return (
        <div className="dashboard-app container">

            <form onSubmit={sendData}>
                <h1 style={{fontSize : '48px'}}>Add Attendance</h1>
                <div className="form-group">
                    <label for="employeeId">ID</label>
                    <input className="form-control" id="employeeId" placeholder="Enter employee Id" value={employeeId} onChange={(e) => {
                        setId(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="status">Status</label>&nbsp;
                    <select id="status" name="status" onChange={(e) => {
                        setAttendance(e.target.value);
                    }} >
                        <option value="Not Selected" >Choose one...</option>
                        <option value="Present" >Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Half-day">Half-day</option>
                    </select>
                </div>
                {/* <div className="form-group">
                    <label for="time_in">Time In</label>
                    <input type="text" className="form-control" id="time_in" placeholder="Enter time" onChange={(e) => {
                        setTime_in(e.target.value);
                    }} />
                </div> */}
                <div className="form-group">
                    <label for="date">Date</label>
                    <input type="date" className="form-control without_ampm" id="date" placeholder="Enter date" onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>
                {status === 'Absent' ? (
                    <div>
                        <div className="form-group">
                            <label for="time_in">Time In</label>
                            <input type="time" className="form-control without_ampm" id="time_in" placeholder="Enter time" disabled value={"00:00"} onChange={(e) => {
                                setTime_in(e.target.value);
                            }} />
                        </div>
                        <div className="form-group">
                            <label for="time_out">Time Out</label>
                            <input type="time" className="form-control" id="time_out" placeholder="Enter time" disabled value={"00:00"} onChange={(e) => {
                                setTime_out(e.target.value);
                            }} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label for="time_in">Time In</label>
                            <input type="time" className="form-control without_ampm" id="time_in" placeholder="Enter time" onChange={(e) => {
                                setTime_in(e.target.value);
                            }} />
                        </div>
                        <div className="form-group">
                            <label for="time_out">Time Out</label>
                            <input type="time" className="form-control" id="time_out" placeholder="Enter time" onChange={(e) => {
                                setTime_out(e.target.value);
                            }} />
                        </div>
                    </div>

                )}

                {/* <div>
                    <label htmlFor="time_in">Select a date and time:</label>
                    <input
                        type="datetime-local"
                        id="final"
                        name="final"
                        value={final}
                        // onChange={handleDateTimeChange}
                    />
                </div> */}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}