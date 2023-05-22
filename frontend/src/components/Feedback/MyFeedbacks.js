import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

//import './CSS/myFeedback.css'

export default function MyFeedbacks() {

  const [allMyFeedbacks, setMyFeedbacks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
      function getMyFeedbacks(){
        axios.get("http://localhost:4500/feedback/").then((res)=>{
            setMyFeedbacks(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
      }
      getMyFeedbacks();
  }, [])

  //Delete function
  function deleteMyFeedbacks(feedback) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:4500/feedback/delete/"+feedback._id)
          .then(() => {
            setMyFeedbacks(allMyFeedbacks.filter((i) => i._id !== feedback._id));
            Swal.fire(
              'Deleted!',
              'Your item has been deleted.',
              'success'
            );
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  }

  //Search function
  function searchTable(allMyFeedbacks) {
    return allMyFeedbacks.filter((i) => {
      return (
        i.uname.toLowerCase().includes(searchInput.toLowerCase()) 
      );
    });
  }

  return (
    <body>
        <section id="content">
            <main>
                <div className="table-data">
                    <div className="order">
                        <div className="headers">
                            <center><h3>My feedbacks</h3></center>
                        </div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Message</th>
                                <th>Service</th>
                                <th><div className="action">Action</div></th>
                            </tr>
                            </thead>
                            <tbody>
                                {searchTable(allMyFeedbacks).map((i, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{i.uname}</td>
                                            <td>{i.message}</td>
                                            <td>{i.service}</td>
                                            <td>
                                                <Link to={`/feedback/updatefeedback/${i._id}`}><button className="edit">Edit</button></Link>
                                                <button className="delete" onClick={(()=>deleteMyFeedbacks(i))}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>                  
            </main>
        </section>
    </body>
  );
}
