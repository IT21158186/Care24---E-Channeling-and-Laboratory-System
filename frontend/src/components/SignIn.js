
import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

// import './css/signinForm.css'
import './loginRegister/login.css';

function Signin() {

    const [email, setEmail] = useState("");
    const [employeeId, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:4500/signin", {
                email: email,
                password: password,
            });

            const { token, user } = response.data;

            if(response.data.user.usertype==="Inventory Manager"){
                window.location.href = '/inventory/all';
            }
            else if(response.data.user.usertype==="Lab Analysist"){
                window.location.href = '/addsample';
            }
            else if(response.data.user.usertype==="Employee Manager"){
                window.location.href = '/employee';
            }
            else if(response.data.user.usertype==="Employee"){
                setId(email);
                window.location.href = `/employee/view/${employeeId}`;
            }
            else if(response.data.user.usertype==="Receiptionist"){
                window.location.href = '/appointments/overview';
            }
            else if(response.data.user.usertype==="Financial Manager"){
                window.location.href = '/invoices/catalog';
            }
            else{
                window.location.href = '/';
            }


            

            localStorage.setItem("TOKEN", response.data.token);
            localStorage.setItem("USERID", response.data.user._id);
            localStorage.setItem("NAME", response.data.user.fullname);
            localStorage.setItem("EMAIL", response.data.user.email);
            localStorage.setItem("USERTYPE", response.data.user.usertype);

        } catch (error) {
            setError(error.response.data.message);
        }
    };

    /*return (
        <>
            <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <h1 className="text-center">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" style={{maxWidth: "500px"}} className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" style={{maxWidth: "500px"}} className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </form>
                    </div></div></div>
        </>
    );
}*/
return (
    <>
      {/* <div className="dashboard">
        <div className="dashboard-app">
          <div className="dashboard-content">
            <h1 className="text-center">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" style={{ maxWidth: "500px" }} className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" style={{ maxWidth: "500px" }} className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <br />
              <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            </form>
          </div>
        </div>
      </div> */}


      <section class="vh-100">
      
  <div class="container py-5 h-100">
  
    <div class="row d-flex align-items-center justify-content-center h-100">
    <h1 className="text-center">Sign In</h1>
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image"/>
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form onSubmit={handleSubmit}>
          
          <div class="form-outline mb-4">
          <label class="form-label" for="form1Example13">Email address</label>&nbsp;
            <input type="email" style={{ maxWidth: "500px" }} className="" id="email" onChange={(e) => setEmail(e.target.value)} />
            
          </div>
          
          <div class="form-outline mb-4">
          <label class="form-label" for="form1Example23">Password</label>&nbsp;
            <input type="password" style={{ maxWidth: "500px" }} className="" id="password" onChange={(e) => setPassword(e.target.value)} />
            
          </div>

        
         <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </form>

                        <div class="text-center">
                            <p>Not a member? <a href="/signup">Register</a></p>
                        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}  

export default Signin;
