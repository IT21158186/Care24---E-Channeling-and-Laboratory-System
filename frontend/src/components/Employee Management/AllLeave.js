import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


export default function AllLeaves() {

    const params = useParams();
    const id = params.id;
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        function getLeaves() {
            axios.get("http://localhost:4500/leave/").then((res) => {
                setLeaves(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getLeaves();
    }, [])



    function onDelete(id) {
        axios.delete(`http://localhost:4500/leave/delete/${id}`)
        Swal.fire({
            icon: "info",
            title: "Deleted Successfully!",
            confirmButtonText: "OK",
            onConfirm: () => {

            },
        }).then(refreshPage)
            // .then((res) => {
            //     alert("Deleted Successfully!");
            //     this.getLeaves();
            // })
            .catch((error) => {
                console.error("Error deleting leave:", error);
            });
    }

    function refreshPage() { window.location.reload(false); }


    function onUpdate(id) {
        const newLeave = {
            status: "Approved"
        }
        axios.put(`http://localhost:4500/leave/updateStatus/${id}`, newLeave).then(() => {
            Swal.fire({
                icon: "success",
                title: "Approved Successfully!",
                confirmButtonText: "OK",
                onConfirm: () => {

                },
            }).then(refreshPage)
        }).catch((error) => {
            alert(error)
        })
    }
    function onUpdate1(id) {
        const newLeave = {
            status: "Rejected"
        }
        axios.put(`http://localhost:4500/leave/updateStatus/${id}`, newLeave).then(() => {
            Swal.fire({
                icon: "success",
                title: "Rejected Successfully!",
                confirmButtonText: "OK",
                onConfirm: () => {

                },
            }).then(refreshPage)
        }).catch((error) => {
            alert(error)
        })
    }
    function refreshPage() { window.location.reload(false); }

    return (
        <div className="dashboard-app container">
            <h1 style={{fontSize : '48px'}}>Received Leave Requests</h1>
            <div>
                <br />
                <br />
            </div>
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Remarks</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{leave.employeeId}</td>
                            <td>{leave.date}</td>
                            <td>{leave.type}</td>
                            <td>{leave.remarks}</td>
                            {/* <td>{leave.status}</td> */}
                            <td className={`${leave.status === 'Rejected' ? 'text-danger' : leave.status === 'Approved' ? 'text-success' : ''}`}><b>{leave.status}</b></td>

                            {leave.status === 'Approved' || leave.status === 'Rejected' ? (
                                <td>Action taken</td>
                            ) : (
                                <td>
                                    <button className="btn btn-primary" onClick={() => onUpdate(`${leave._id}`)}>
                                        <i className='fas fa-check' style={{ color: "#02f212", }}></i>&nbsp;Approve
                                    </button>&nbsp;
                                    <button className='btn btn-danger' onClick={() => onUpdate1(`${leave._id}`)}>
                                        <i className="fas fa-xmark" style={{ color: "#ffffff", }} />&nbsp;Reject
                                    </button>
                                </td>
                            )}

                        </tr>
                    ))}

                </tbody>

            </table>



            <a className='btn btn-warning' href={`/leave/add`}>
                <i className=''></i>&nbsp;Add Leave Manually
            </a>
        </div>

    )
}