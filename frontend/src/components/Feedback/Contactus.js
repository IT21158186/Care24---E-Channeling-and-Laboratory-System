import React, {useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

//import './CSS/contactUsForm.css'

export default function SendContactusMsg() {

    const [name, setName] = useState("");
    const [email, setEmail] =useState("");
    const [message, setMessage] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newContactusMessage = {
            name, email, message
        }

        axios.post("http://localhost:4500/contactus/add", newContactusMessage)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your Message has been sent.',
                confirmButtonColor: '#4BB543',
            });
            setName("");
            setEmail("");
            setMessage("")
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
        <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div class="container-contact-us">
            <div class="content">
                <div class="left-side">
                    <div class="address details">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="topic">Address</div>
                        <div class="text-one">Surkhet, NP12</div>
                        <div class="text-two">Birendranagar 06</div>
                    </div>
                    <div class="phone details">
                         <i class="fas fa-phone-alt"></i>
                         <div class="topic">Phone</div>
                         <div class="text-one">+0098 9893 5647</div>
                         <div class="text-two">+0096 3434 5678</div>
                    </div>
                    <div class="email details">
                        <i class="fas fa-envelope"></i>
                        <div class="topic">Email</div>
                        <div class="text-one">codinglab@gmail.com</div>
                        <div class="text-two">info.codinglab@gmail.com</div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="topic-text">Send us a message</div>
                    <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>
                <form onSubmit={sendData}>
                    <div class="input-box">
                        <input type="text" placeholder="Enter your name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                    </div>
                    <div class="input-box">
                        <input type="email" placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                    </div>
                    <div class="input-box message-box">
                        <input type="text" placeholder="Enter your message"
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}/>                    
                    </div>
                    <div class="button-contact-us">
                        <button type="submit" value="Send Now">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    )
}
