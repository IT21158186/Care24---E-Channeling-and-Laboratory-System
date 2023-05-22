import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function EditAttendance() {


    const params = useParams();
    const [name, setName] = useState("");
    const [status, setAttendance] = useState("");
    const [time_in, setTime_in] = useState("");
    const [time_out, setTime_out] = useState("");
    const [final, setDateTime] = useState();
    const [employeeId, setId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function getAttendance() {
            axios.get(`http://localhost:4500/attendance/get/${params.id}`).then((res) => {
                setName(res.data.attendance.name);
                setAttendance(res.data.attendance.status);
                setTime_in(res.data.attendance.time_in);
                setTime_out(res.data.attendance.time_out);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getAttendance();



    }, [])

    function updateData(e) {
        e.preventDefault();//prevent normal behaviour
        const newAttendance = {
            name,
            status,
            time_in,
            time_out
        }
        axios.put(`http://localhost:4500/attendance/update/${params.id}`, newAttendance)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Attendance Updated!",
                confirmButtonText: "OK",
                onConfirm: () => {
    
                },
            
            })
        }).then(() => navigate("/attendance/"))
            // .then(() => {
            //     alert("Attendance Updated!");
            // })
            .catch((error) => {
                alert(error)
            })


    }


    return (
        <div className="dashboard-app container">
            <h1>Update Attendance</h1>
                <br />
            <form onSubmit={updateData}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="status">Status</label>
                    <input type="text" className="form-control" id="status" placeholder="Enter status" value={status} onChange={(e) => {
                        setAttendance(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="time_in">Time In</label>
                    <input type="time" className="form-control" id="time_in" placeholder="Enter time" value={time_in} onChange={(e) => {
                        setTime_in(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="time_out">Time Out</label>
                    <input type="time" className="form-control" id="time_out" placeholder="Enter time_out" value={time_out} onChange={(e) => {
                        setTime_out(e.target.value);
                    }} />
                </div>

                <button type="Submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}