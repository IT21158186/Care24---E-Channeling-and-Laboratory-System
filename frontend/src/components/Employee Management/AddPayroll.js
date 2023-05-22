import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";


export default function AddPayroll() {

    const params = useParams();
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [casual_leave, setCasual_leave] = useState("");
    const [medical_leave, setMedical_leave] = useState("");
    const [bonus, setBonus] = useState("");
    const [tax, setTax] = useState("");
    const [employeeId, setId] = useState("");
    const [payrolls, setPayrolls] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (params.id) {
            function getPayroll() {
                axios.get(`http://localhost:4500/payroll/add/get/${params.id}`).then((res) => {
                    setName(res.data.employee.name);
                    setId(res.data.employee._id);

                }).catch((error) => {
                    alert(error.message);

                })
            }

            getPayroll();

            // function getPayrolls() {
            //     axios.get("http://localhost:4500/payroll/").then((res) => {
            //         setPayrolls(res.data);
            //     }).catch((error) => {
            //         alert(error.message);

            //     })
            // }

            // getPayrolls();
        }



    }, [])

    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        const newPayroll = {
            employeeId,
            name,
            salary,
            casual_leave,
            medical_leave,
            bonus,
            tax

        }
        //alert("Hi" + name)
        axios.post("http://localhost:4500/payroll/add", newPayroll)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Payroll Added!",
                    confirmButtonText: "OK",
                })
            }).then(() => navigate("/payroll/"))
            .catch((error) => {
                alert(error)
            })

    }

    return (
        <div className="dashboard-app container">
            <h1>Add Payroll</h1>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label for="employeeId">ID</label>
                    <input className="form-control" id="employeeId" placeholder="Type here..." value={employeeId} onChange={(e) => {
                        setId(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" value={name} placeholder="Type here..." onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="salary">Salary</label>
                    <input type="text" className="form-control" id="salary" placeholder="Type here..." onChange={(e) => {
                        setSalary(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="casual_leave">Casual Leave</label>
                    <input type="text" className="form-control" id="casual_leave" placeholder="Type here..." onChange={(e) => {
                        setCasual_leave(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="medical_leave">Medical Leave</label>
                    <input type="text" className="form-control" id="medical_leave" placeholder="Type here..." onChange={(e) => {
                        setMedical_leave(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="bonus">Bonus</label>
                    <input type="text" className="form-control" id="bonus" placeholder="Type here..." onChange={(e) => {
                        setBonus(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="tax">Tax(%)</label>
                    <input type="Number" className="form-control" id="tax" placeholder="Type here..." onChange={(e) => {
                        setTax(e.target.value);
                    }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}