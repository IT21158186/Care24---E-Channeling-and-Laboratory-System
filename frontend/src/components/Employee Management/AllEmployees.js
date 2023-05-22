import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Swal from "sweetalert2";

export default function AllEmployees() {

    const params = useParams();
    const id = params.id;
    const [employees, setEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function getEmployees() {
            axios.get("http://localhost:4500/employee/").then((res) => {
                setEmployees(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getEmployees();
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
                axios.delete(`http://localhost:4500/employee/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        )
                        setEmployees(employees.filter((i) => i._id !== id));
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            }
        })
        // .then(() => { window.location.reload(false); })
            // .then((res) => {
            //     alert("Deleted Successfully!");
            //     this.getEmployees();
            //     () => navigate("employee/");
            // })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    }

    // function generateReport() {
    //     const doc = new jsPDF();
    //     doc.text("Employee Report", 10, 10);
    //     const headers = [['Index','ID', 'Employee Name', 'Address', 'Mobile No', 'DOB', 'Email', 'Gender', 'Leave Limit']];
    //     const data = employees.map(({ name, _id, address, mobileNo, dob, email, gender, leaveLimit }, index) => [index + 1,  _id, name, address, mobileNo, dob, email, gender, leaveLimit]);
    //     doc.autoTable({ head: headers, body: data });
    //     doc.save('Employee_report.pdf');
    // }
    function generateReport() {
        const doc = new jsPDF();
        doc.text("Employee Report", 10, 10);
        const headers = [['Index', 'ID', 'Employee Name', 'Address', 'Mobile No', 'Email']];
        const data = employees.map(({ name, _id, address, mobileNo, email }, index) => [index + 1, _id, name, address, mobileNo, email]);
        doc.autoTable({ head: headers, body: data });
        doc.save('Employee_report.pdf');
    }
    function searchTable(employees) {
        return employees.filter((employee) => {
            for (const key in employee) {
              if (
                employee.hasOwnProperty(key) &&
                typeof employee[key] === "string" &&
                employee[key].toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return true;
              }
            }
            return false;
          });
        // return employees.filter((employee) => {
        //     return (
        //         employee.name.toLowerCase().includes(searchInput.toLowerCase())
        //     );
        // });
    }

    return (
        <div className="dashboard-app">

            <div className="">
                <br /><br />
                <center><h1 style={{fontSize : '48px'}}>Employee Management Dashboard</h1></center>
                <br />
                <br />
                <a className='btn btn-warning' href={`employee/add`}>
                    <i className=''></i>&nbsp;Add New Employee
                </a>
                &nbsp;&nbsp;&nbsp;

                <button type="submit" className="btn btn-primary"
                    onClick={generateReport}>
                    Generate & Download Employee Report
                </button>
                <br /><br />
            </div>
            <div className="searchbar">
                <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Search for Employee..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div>
                <br />
                <br />
            </div>

            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">NIC</th>
                        {/* <th scope="col">Birth </th> */}
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        {/* <th scope="col">Leave Limit</th> */}
                        {/* <th scope="col">Password</th> */}
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTable(employees).map((employee, index) => (
                        <tr style={{ width: "90%" }} key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{employee.name}</td>
                            <td>{employee._id}</td>
                            <td>{employee.address}</td>
                            <td>{employee.mobileNo}</td>
                            <td>{employee.nic}</td>
                            {/* <td>{employee.dob}</td> */}
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                            {/* <td>{employee.leaveLimit}</td> */}
                            {/* <td>{employee.password}</td> */}

                            <td style={{ display: 'flex' }}> {/* <i class="fa-solid fa-calendar-days"></i> <i class="fa-solid fa-money-bill"></i>*/}
                                <a className='btn btn-warning' href={`employee/get/${employee._id}`}>
                                    <i title="Update Employee" className='fas fa-edit'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-warning' href={`leave/add/get/${employee._id}`}>
                                    <i title="Make a Leave" className='fas fa-calendar-days'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-warning' href={`attendance/add/get/${employee._id}`}>
                                    <i title="Mark Attendance" className='fas fa-check'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-warning' href={`payroll/add/get/${employee._id}`}>
                                    <i title="Add Payroll" className='fas fa-money-bill'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-danger' onClick={() => onDelete(`${employee._id}`)}>
                                    <i title="Delete Employee" className='fas fa-trash-alt'></i>&nbsp;
                                </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    )
}