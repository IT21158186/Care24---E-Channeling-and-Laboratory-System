import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function EditLeave() {


    const params = useParams();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [remarks, setRemarks] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function getLeave() {
            axios.get(`http://localhost:4500/leave/get/${params.id}`).then((res) => {
                setName(res.data.leave.name);
                setDate(res.data.leave.date);
                setType(res.data.leave.type);
                setRemarks(res.data.leave.remarks);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getLeave();



    }, [])

    function updateData(e) {
        e.preventDefault();//prevent normal behaviour
        const newLeave = {
            name,
            date,
            type,
            remarks
        }
        axios.put(`http://localhost:4500/leave/update/${params.id}`, newLeave)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Leave Updated!",
                    confirmButtonText: "OK",
                    onConfirm: () => {

                    },
                })
            })
            .catch((error) => {
                alert(error)
            })


    }


    return (
        <div className="dashboard-app container">
            <h1>Update Leave</h1>
            <br />
            <form onSubmit={updateData}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="date">Date</label>
                    <input type="text" className="form-control" id="date" placeholder="Enter date" value={date} onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="type">Mobile No</label>
                    <input type="text" className="form-control" id="type" placeholder="Enter type" value={type} onChange={(e) => {
                        setType(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="remarks">Date of birth</label>
                    <input type="text" className="form-control" id="remarks" placeholder="Enter remarks" value={remarks} onChange={(e) => {
                        setRemarks(e.target.value);
                    }} />
                </div>

                <button type="Submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}