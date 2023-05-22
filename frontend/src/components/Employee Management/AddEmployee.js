import React, { useState } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddEmployee() {


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

    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        if (checkPassword()) {
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
            //alert("Hi" + name)
            axios.post("http://localhost:4500/employee/add", newEmployee).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Employee Added!",
                    confirmButtonText: "OK",
                    onConfirm: () => {

                    },
                }).then(() => navigate("/"));
            }).catch((error) => {
                alert(error)
            })


        }
    }
    function checkPassword() {

        // 👇 check if both match using if-else condition
        if (password !== confirm_password) {
            Swal.fire({
                icon: "error",
                title: "Error, Password did not match !",
                confirmButtonText: "OK",
                onConfirm: () => {


                },
            });
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className="dashboard-app container">


            <form className="needs-validation"onSubmit={sendData} novalidate>
                <fieldset>
                    <legend><h1>Employee Registration</h1></legend>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input className="form-control" id="name" placeholder="Enter name" onChange={(e) => {
                            setName(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="address">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="Enter address" onChange={(e) => {
                            setAddress(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="mobileNo">Mobile No</label>
                        <input type="tel" className="form-control" id="mobileNo" placeholder="Enter mobile No" pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]" onChange={(e) => {
                            setMobileNo(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="nic">NIC</label>
                        <input type="text" className="form-control" id="nic" placeholder="Enter NIC" pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][V]" onChange={(e) => {
                            setNIC(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="dob">Date of birth</label>
                        <input type="date" className="form-control" id="dob" placeholder="Enter date of birth" onChange={(e) => {
                            setDOB(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email address" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label" for="inlineRadio">Gender : </label><br />
                        <div className="form-check form-check-inline">

                            <input className="form-check-input" type="radio" id="gender" name="gender" onChange={(e) => {
                                setGender(e.target.value);
                            }} value="Male" />
                            <div class="invalid-feedback">
                                Please fill this feild.
                            </div>
                            <label style={{ fontWeight: 'normal' }} className="form-check-label" for="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="gender" name="gender" onChange={(e) => {
                                setGender(e.target.value);
                            }} value="Female" />
                            <label style={{ fontWeight: 'normal' }} className="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                    </div>


                    <div className="form-group">
                        <label for="leaveLimit">Leave Limit</label>
                        <input type="Number" className="form-control" min="0" max="10" id="leaveLimit" placeholder="Enter Leave Limit" onChange={(e) => {
                            setLeaveLimit(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password" placeholder="Enter Password" onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }} />
                        <div class="invalid-feedback">
                            Please fill this feild.
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Add</button>
                </fieldset>
            </form>

        </div>
    )
}