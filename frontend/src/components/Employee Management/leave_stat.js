import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function AllLeaves() {

    const params = useParams();
    const id = params.id;
    const [leaves, setLeaves] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    // const [Id, setId] = useState(params.id);

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
            icon: "success",
            title: "Leave Cancelled!",
            confirmButtonText: "OK",
            onConfirm: () => {

            },
        })

            // .then((res) => {
            //     alert("Deleted Successfully!");
            //     this.getLeaves();
            // })
            .catch((error) => {
                console.error("Error deleting leave:", error);
            });
    }


    function searchTable(leaves) {
        return leaves.filter((leave) => {
            return (
                leave.employeeId.toLowerCase().includes(id)


            );
        });
    }




    return (
        <div className="dashboard-app container">
            <h2>My Leave Requests</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Remarks</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTable(leaves).map((leave, index) => (
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


                                    <a className='btn btn-danger' onClick={() => onDelete(`${leave._id}`)}>
                                        <i className="fas fa-xmark" style={{ color: "#ffffff", }} />&nbsp;Cancel
                                    </a>
                                </td>
                            )}

                        </tr>
                    ))}

                </tbody>

            </table>
        </div>

    )
}