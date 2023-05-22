import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddLeave() {

    const params = useParams();
    const [employeeId, setId] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [remarks, setRemarks] = useState("");
    const [status, setStatus] = useState("Under Review");
    const navigate = useNavigate();


    useEffect(() => {
        if(params.id){
            function getLeave() {
                axios.get(`http://localhost:4500/leave/add/get/${params.id}`).then((res) => {
                    // setName(res.data.employee.name);
                    setId(res.data.employee._id);
                }).catch((error) => {
                    alert(error.message);
    
                })
            }
    
            getLeave();

        }
        
    }, [])

    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        const newLeave = {
            employeeId,
            date,
            type,
            remarks,
            status
        }
        //alert("Hi" + employeeId)
        axios.post("http://localhost:4500/leave/add", newLeave)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "leave Added!",
                confirmButtonText: "OK",
                onConfirm: () => {
    
                },
            })
        }).then(() => navigate("/leave/"))

        .catch((error) => {
            alert(error)
        })

    }

    return (
        <div className="dashboard-app container">
            <h2>Make a Leave</h2>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label for="employeeId">ID</label>
                    <input className="form-control" id="employeeId" placeholder="Type here..." value={employeeId} onChange={(e) => {
                        setId(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="date">Date</label>
                    <input type="date" className="form-control" id="date" placeholder="Type here..." onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>
                {/* <div className="form-group">
                    <label for="type">Type</label>
                    <input type="text" className="form-control" id="type" placeholder="Type here..." onChange={(e) => {
                        setType(e.target.value);
                    }} />
                </div> */}
                <div className="form-group">
                    <label for="type">Type</label>&nbsp;
                    <select id="type" name="type" onChange={(e) => {
                        setType(e.target.value);
                    }} >
                        <option value="Not Selected" >Choose one...</option>
                        <option value="Medical" >Medical</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="remarks">Remarks</label>
                    <input type="text" className="form-control" id="remarks" placeholder="Type here..." onChange={(e) => {
                        setRemarks(e.target.value);
                    }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}