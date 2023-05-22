import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

export default function AllPayrolls() {

    const params = useParams();
    const id = params.id;
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        function getPayrolls() {
            axios.get("http://localhost:4500/payroll/").then((res) => {
                setPayrolls(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getPayrolls();
    }, [])



    function onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:4500/payroll/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        )
                        setPayrolls(payrolls.filter((i) => i._id !== id));
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            }
        })


        
        // Swal.fire({
        //     icon: "info",
        //     title: "Employee Deleted!",
        //     confirmButtonText: "OK",
        //     onConfirm: () => {

        //     },
        // }).then(() => { window.location.reload(false); })
        //     // .then((res) => {
        //     //     alert("Deleted Successfully!");
        //     //     this.getPayrolls();
        //     // })
        //     .catch((error) => {
        //         console.error("Error deleting payroll:", error);
        //     });
    }

    function salaryCalc() {

        const amount = payrolls.map((employee) => ({
            ...employee,
            salary1: (employee.salary + employee.bonus) * (100 - employee.tax) / 100,
        }));

        const data = amount.map(({ name, salary, bonus, salary1 }, index) => [index + 1, name, salary, bonus, salary1]);
        console.log(amount);


        return data;

    }

    function generateReport() {
        const doc = new jsPDF();
        doc.text("Salary Report", 10, 10);
        const headers = [['Index', 'Employee Name', 'Basic', 'Bonus', 'Salary']];
        const data = salaryCalc();
        doc.autoTable({ head: headers, body: data });
        doc.save('Salary_report.pdf');
    }


    return (
        <div className="dashboard-app container">
            <div className="">
                <br /><br />
                <h1 style={{fontSize : '48px'}}>Payroll System</h1>
                <br />
                <Link className='btn btn-warning' to={`/payroll/add`}>
                    <i className=''></i>&nbsp;Add New Payroll
                </Link>
                &nbsp;&nbsp;&nbsp;

                <button type="submit" className="btn btn-primary" onClick={generateReport}>
                    Generate & Download Salary Report
                </button>
                <br /><br />
            </div>
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Casual Leaves</th>
                        <th scope="col">Medical Leaves</th>
                        <th scope="col">Bonus</th>
                        <th scope="col">Tax(%)</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((payroll, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{payroll.employeeId}</td>
                            <td>{payroll.name}</td>
                            <td>{payroll.salary}</td>
                            <td>{payroll.casual_leave}</td>
                            <td>{payroll.medical_leave}</td>
                            <td>{payroll.bonus}</td>
                            <td>{payroll.tax}</td>

                            <td>
                                <a className='btn btn-warning' href={`get/${payroll._id}`}>
                                    <i className='fas fa-edit'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-danger' onClick={() => onDelete(`${payroll._id}`)}>
                                    <i className='fas fa-trash-alt'></i>&nbsp;
                                </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <div>
                <br />
                <br />
            </div>
            <div>
                <br />
                <br />
            </div>


        </div>

    )
}