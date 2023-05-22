import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

//import './CSS/feedbackForm.css'

export default function SendFeedback() {

    const [uname, setName] = useState("");
    const [notifications, setNotifications] = useState("");
    const [visually, setVisually] = useState("");
    const [experience, setExperience] = useState("");
    const [message, setMessage] = useState("");
    const [service, setService] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newAddFeedback = {
            uname,
            notifications,
            visually,
            experience,
            message,
            service
        }

        axios.post("http://localhost:4500/feedback/add", newAddFeedback)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your feedback has been sent.',
                    confirmButtonColor: '#4BB543',
                });
                setName("");
                setNotifications("");
                setVisually("");
                setExperience("");
                setMessage("");
                setService("");
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                    confirmButtonColor: '#d33',
                });
            })
    }

    return (
        <div className="container-feedbackform">
            <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
            <div className="title">Tell Us What You Think !</div>
            <div className="content">
                <form onSubmit={sendData}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type="text" placeholder="Enter your username" defaultValue={localStorage.getItem("EMAIL")} required
                                onChange={(e) => {
                                    setName(e.target.value);
                                }
                                } />
                        </div>
                    </div>
                    <div>
                        <h>Does this app have useful notifications?</h>
                        <div className="select">
                            <select name="format" id="format" onChange={(e) => setNotifications(e.target.value)}>
                                <option selected disabled>Choose an option</option>
                                <option value="No">No</option>
                                <option value="notsure">Not Sure</option>
                                <option value="yes">Yes, of course</option>
                                <option value="yes">No Can't</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <h>Does this app look bad visually?</h>
                        <div className="select">
                            <select name="format" id="format" onChange={(e) => setVisually(e.target.value)}>
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
                            <select name="format" id="format" onChange={(e) => setExperience(e.target.value)}>
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
                            <input type="text" placeholder="Enter your message" required
                                onChange={(e)=> {
                                setMessage(e.target.value);
                            }
                        }/>
                        </div>
                    </div>
                    <div class="gender-details">
                        <input type="radio" name="service" id="dot-1" value="good" 
                        checked={service === 'good'}
                        onChange={(e)=> {
                            setService(e.target.value);
                            }
                        }/>
                        <input type="radio" name="service" id="dot-2" value="better"
                        checked={service === 'better'}
                        onChange={(e)=> {
                            setService(e.target.value);
                            } 
                        }/>
                        <input type="radio" name="service" id="dot-3" value="excelent" 
                        checked={service === 'excelent'}
                        onChange={(e)=> {
                            setService(e.target.value);
                            }
                        }/>
                        <span class="gender-title">Our Service</span>
                        <div class="category">
                            <label for="dot-1">
                                <span class="dot one"></span>
                                <span class="gender">Good</span>
                                </label>
                            <label for="dot-2">
                                <span class="dot two"></span>
                                <span class="gender">Better</span>
                            </label>
                            <label for="dot-3">
                                <span class="dot three"></span>
                                <span class="gender">Excelent</span>
                            </label>
                        </div>
                    </div>
                    <div class="button-feedbackform">
                        <input type="submit" value="Rate Us" />
                    </div>
                </form>
            </div></div></div></div>
        </div>
    )
}
