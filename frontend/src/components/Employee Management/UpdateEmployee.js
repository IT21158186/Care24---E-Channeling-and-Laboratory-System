import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function EditEmployee() {


    const params = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [nic, setNIC] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [leaveLimit, setLeaveLimit] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function getEmployee() {
            axios.get(`http://localhost:4500/employee/get/${params.id}`).then((res) => {
                setName(res.data.employee.name);
                setAddress(res.data.employee.address);
                setMobileNo(res.data.employee.mobileNo);
                setNIC(res.data.employee.nic);
                setDOB(res.data.employee.dob);
                setEmail(res.data.employee.email);
                setGender(res.data.employee.gender);
                setLeaveLimit(res.data.employee.leaveLimit);
                setPassword(res.data.employee.password);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getEmployee();



    }, [])

    function setGenderRadio() {

        // 👇 check if both match using if-else condition
        if (gender !== "Male") {
            return false;
        } else {
            return true;
        }
    }

    function updateData(e) {
        e.preventDefault();//prevent normal behaviour
        const newEmployee = {
            name,
            address,
            mobileNo,
            nic,
            dob,
            email,
            gender,
            leaveLimit,
            password
        }
        axios.put(`http://localhost:4500/employee/update/${params.id}`, newEmployee)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Employee Updated!",
                confirmButtonText: "OK",
                onConfirm: () => {
    
                },
            })
        })
        .then(() => navigate("/employee"))
            // .then(() => {
            //     alert("Employee Updated!");
            // })
            .catch((error) => {
                alert(error)
            })


    }


    return (
        <div className="dashboard-app container">
            <h1>Update Employee</h1>
            <br />
            <form onSubmit={updateData}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="mobileNo">Mobile No</label>
                    <input type="tel" className="form-control" id="mobileNo" placeholder="Enter mobile No" pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]" value={mobileNo} onChange={(e) => {
                        setMobileNo(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="nic">NIC</label>
                    <input type="numeric" className="form-control" id="nic" placeholder="Enter NIC" pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]" value={nic} onChange={(e) => {
                        setNIC(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="dob">Date of birth</label>
                    <input type="text" className="form-control" id="dob" placeholder="Enter date of birth" value={dob} onChange={(e) => {
                        setDOB(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email address" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="genger">Gender</label>&nbsp;
                    <select id="genger" onChange={(e) => { setGender(e.target.value); }} value={gender}>
                        <option value="Male" >Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="leaveLimit">Leave Limit</label>
                    <input type="Number" className="form-control" id="leaveLimit" placeholder="Enter Leave Limit" value={leaveLimit} onChange={(e) => {
                        setLeaveLimit(e.target.value);
                    }} />
                </div>
                {/* <div className="form-group">
                    <label for="password">Password</label>
                    <input type="text" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div> */}

                <button type="Submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}