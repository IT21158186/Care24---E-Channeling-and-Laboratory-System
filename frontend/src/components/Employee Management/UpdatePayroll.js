import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function EditPayroll() {


    const params = useParams();
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [casual_leave, setCasual_leave] = useState("");
    const [medical_leave, setMedical_leave] = useState("");
    const [bonus, setBonus] = useState("");
    const [tax, setTax] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        function getPayroll() {
            axios.get(`http://localhost:4500/payroll/get/${params.id}`).then((res) => {
                setName(res.data.payroll.name);
                setSalary(res.data.payroll.salary);
                setCasual_leave(res.data.payroll.casual_leave);
                setMedical_leave(res.data.payroll.medical_leave);
                setBonus(res.data.payroll.bonus);
                setTax(res.data.payroll.tax);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getPayroll();



    }, [])

    function updateData(e) {
        e.preventDefault();//prevent normal behaviour
        const newPayroll = {
            name,
            salary,
            casual_leave,
            medical_leave,
            bonus,
            tax
        }
        axios.put(`http://localhost:4500/payroll/update/${params.id}`, newPayroll)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Payroll Updated!",
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
            <h1>Update Payroll</h1>
            <br />
            <form onSubmit={updateData}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="salary">Address</label>
                    <input type="Number" className="form-control" id="salary" placeholder="Enter salary" value={salary} onChange={(e) => {
                        setSalary(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="casual_leave">Mobile No</label>
                    <input type="Number" className="form-control" id="casual_leave" placeholder="Enter casual leave" value={casual_leave} onChange={(e) => {
                        setCasual_leave(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="medical_leave">Date of birth</label>
                    <input type="Number" className="form-control" id="medical_leave" placeholder="Enter medical leave" value={medical_leave} onChange={(e) => {
                        setMedical_leave(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="bonus">Email</label>
                    <input type="Number" className="form-control" id="bonus" placeholder="Enter bonus" value={bonus} onChange={(e) => {
                        setBonus(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="tax">Leave Limit</label>
                    <input type="Number" className="form-control" id="tax" placeholder="Enter tax" value={tax} onChange={(e) => {
                        setTax(e.target.value);
                    }} />
                </div>

                <button type="Submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}