import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";
import Sweetalert2 from 'sweetalert2';

//import './CSS/feedbackForm.css'


export default function UpdateMyFeedbacks() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [updateMyFeedbacks, setUpdateMyFeedbacks] = useState({
        uname: '',
        notifications: '',
        visually: '',
        experience: '',
        message: '',
        service: ''
    });


    //Fetch data
    useEffect(() => {
        getUpdateMyFeedbacks();
    }, []);
    
    

    function getUpdateMyFeedbacks() {
        axios.get("http://localhost:4500/feedback/get/" + id )
            .then((res) => {
                console.log(res);
                setUpdateMyFeedbacks({
                    uname: res.data.user.uname,
                    notifications: res.data.user.notifications,
                    visually: res.data.user.visually,
                    experience: res.data.user.experience,
                    message: res.data.user.message,
                    service: res.data.user.service,
                    
                });
//console.log("1234");
            }).catch((err) => {
                alert(err.message);
            })
    } 

    

    const handleChange = (e) => {
        setUpdateMyFeedbacks({
            ...updateMyFeedbacks,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(stock); // or save the data to your backend
        axios.put('http://localhost:4500/feedback/update/' + id, updateMyFeedbacks)
        .then((response) => {
            console.log(response.data.status)
            if (response.data.status === "Feedback Updated!") {

                Sweetalert2.fire({
                    title: "Success!",
                    text: "Successfully Updated!",
                    icon: "success",
                    confirmButtonText: "Done",
                    confirmButtonColor: "#3085d6",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                     setTimeout(() => {
                            navigate('/myfeedback');
                        }, 2000)
                    }
                })

            }
        })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div className="container-feedbackform">
            <div className="title">Tell Us What You Think !</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type="text" placeholder="Enter your username" required value={updateMyFeedbacks.uname} readOnly={true}
                                onChange={(e) => {
                                    setUpdateMyFeedbacks({
                                        ...updateMyFeedbacks,
                                        uname: e.target.value,
                                });
                                }} />
                        </div>
                    </div>
                    <div>
                        <h>Does this app have useful notifications?</h>
                        <div className="select">
                            <select name="format" id="format" value={updateMyFeedbacks.notifications}
                                onChange={(e) => {
                                    setUpdateMyFeedbacks({
                                        ...updateMyFeedbacks,
                                        notifications: e.target.value,
                                    });
                                }}
                            >
                                <option selected disabled>Choose an option</option>
                                <option value="No">No</option>
                                <option value="notsure">Not Sure</option>
                                <option value="yes">Yes, of course</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <h>Does this app look bad visually?</h>
                        <div className="select">
                            <select name="format" id="format" value={updateMyFeedbacks.visually}
                                onChange={(e) => {
                                    setUpdateMyFeedbacks({
                                        ...updateMyFeedbacks,
                                        visually: e.target.value,
                                    });
                                }}
                            >
                                <option selected disabled>Choose an option</option>
                                <option value="No">No</option>
                                <option value="notsure">Not Sure</option>
                                <option value="yes">Yes, of course</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <h>Does the app description match the app experience?</h>
                        <div className="select">
                            <select name="format" id="format" value={updateMyFeedbacks.experience}
                                onChange={(e) => {
                                    setUpdateMyFeedbacks({
                                        ...updateMyFeedbacks,
                                        experience: e.target.value,
                                    });
                                }}
                            >
                                <option selected disabled>Choose an option</option>
                                <option value="No">No</option>
                                <option value="notsure">Not Sure</option>
                                <option value="yes">Yes, of course</option>
                            </select>
                        </div>
                    </div>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Message</span>
                            <input type="text" placeholder="Enter your message" required value={updateMyFeedbacks.message}
                                onChange={(e) => {
                                    setUpdateMyFeedbacks({
                                        ...updateMyFeedbacks,
                                        message: e.target.value,
                                    });
                                }} />
                        </div>
                    </div>

                    <div className="button">
                        <input type="submit" value="Rate Us" />
                    </div>
                </form>
            </div>
        </div></div></div></div>
    )

}
