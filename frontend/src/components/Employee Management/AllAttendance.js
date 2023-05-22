import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AllAttendances() {

    const params = useParams();
    const id = params.id;
    const [attendances, setAttendances] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setcurrentDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function getAttendances() {
            axios.get("http://localhost:4500/attendance/").then((res) => {
                setAttendances(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getAttendances();


        const dateString = Date();
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        setcurrentDate(`${year}-${month}-${day}`)

        setSearchInput(`${year}-${month}-${day}`);

    }, [])


    const fetchData = async () => {
        try {
            const employeesResponse = await axios.get("http://localhost:4500/employee/");
            setEmployees(employeesResponse.data);

            const initialAttendanceList = employeesResponse.data.map((employee) => ({
                employeeId: employee._id,
                name: employee.name,
                date: currentDate,
                time_in: "-",
                time_out: "-",
                status: "Absent",
            }));

            const initialAttendanceResponse = await axios.post("http://localhost:4500/attendance/all", initialAttendanceList);
            alert("Initialized Successfully");

            const attendanceResponse = await axios.get("http://localhost:4500/attendance/");
            setAttendances(attendanceResponse.data);
        } catch (error) {
            alert(error.message);
        }
    };

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
                axios.delete(`http://localhost:4500/attendance/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        )
                        setAttendances(attendances.filter((i) => i._id !== id));
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            }
        })
            // .then((res) => {
            //     alert("Deleted Successfully!");
            //     this.getAttendances();
            // })
            .catch((error) => {
                console.error("Error deleting attendance:", error);
            });
    }

    function refreshPage() { window.location.reload(false); }

    function reset() {
        setSearchInput("")
    }
    function today() {
        setSearchInput(currentDate)
    }


    function searchTable(attendances) {
        return attendances.filter((attendance) => {
            return (
                attendance.date.toLowerCase().includes(searchInput.toLowerCase())


            );
        });
    }


    return (
        <div className="dashboard-app container">
            <h1>Attendance Tracker</h1>
            <br/>
            <p style={{color:'red', fontWeight:'bold'}}>Note : </p>
            <p >Please initialize the attendace system at begining of the day!!!</p>
                <button onClick={fetchData} className='btn btn-warning'>Initialize</button>
            <br /><br /><h3>Clock In</h3>
            <div className="searchbar">
                <div className="row row-cols-lg-auto g-3 align-items-center">
                    <div class="row mb-3 align-items-center">
                        <label for="inputEmail3" class="col-sm-2 col-form-label" style={{ zIndex: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;Date</label>
                        <div class="col-sm-10">
                            <input
                                style={{ width: '100%', margin: '20px 0' }}

                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup"
                                placeholder="Search by Date..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    </div>


                    <div class="col align-items-center"></div>
                    <div class="col align-items-center" style={{ textAlign: 'right', zIndex: 0 }}><button onClick={today} className="btn btn-primary">Today</button>&nbsp;<button onClick={reset} className="btn btn-primary">Show All</button></div>
                </div>

            </div>
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time In</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTable(attendances).map((attendance, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{attendance.employeeId}</td>
                            <td>{attendance.name}</td>
                            <td>{attendance.status}</td>
                            <td>{attendance.date}</td>
                            <td>{attendance.time_in}</td>

                            <td>
                                <a className='btn btn-warning' href={`get/${attendance._id}`}>
                                    <i className='fas fa-edit'></i>&nbsp;
                                </a>&nbsp;
                                <a className='btn btn-danger' onClick={() => onDelete(`${attendance._id}`)}>
                                    <i className='fas fa-trash-alt'></i>&nbsp;
                                </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

            <br /><br /><h3>Clock Out</h3><br />
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time Out</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTable(attendances).map((attendance, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{attendance.employeeId}</td>
                            <td>{attendance.name}</td>
                            <td>{attendance.status}</td>
                            <td>{attendance.date}</td>
                            <td>{attendance.time_out}</td>

                            <td>
                                <a className='btn btn-warning' href={`get/${attendance._id}`}>
                                    <i className='fas fa-edit'></i>&nbsp;
                                </a>&nbsp;
                                {/* <a className='btn btn-danger' onClick={() => onDelete(`${attendance._id}`)}>
                                    <i className='fas fa-trash-alt'></i>&nbsp;Delete
                                </a> */}
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
            <div className="" width="100%">
                <div class="col-sm-10">
                    <p>* Is there any issue with automated attendance tracking, You can use this for add attendance manually</p>
                <a className='btn btn-warning' href={`/attendance/add`}>
                    <i className=''></i>&nbsp;Add New Attendance Manually
                </a>
                
                <br /><br />

                </div>
                

            </div>
        </div>



    )
}