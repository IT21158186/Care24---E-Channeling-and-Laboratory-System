import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './login.css';

const Login = () => {
    //const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send a request to the API to check the email and password
            const response = await axios.post('/users/login', { email, password });
            const { userType } = response.data;

            // Store the user type in localStorage or sessionStorage
            localStorage.setItem('userType', userType);

            // Redirect the user based on their userType
            switch (userType) {
                case 'admin':
                    // Redirect to the allUser page
                    //history.push('/allUsers');
                    window.location.replace("/allUsers")
                    break;
                case 'user':
                    // Redirect to the home page
                    //history.push('/home');
                    window.location.replace("/")
                    break;
                case 'Pharmacist':
                    // Redirect to the PharmacistDashboard page
                    //history.push('/pharmacistDashboard');
                    window.location.replace("/pharmacistDashboard")
                    break;
                default:
                    // Redirect to a default page or show an error message
                    break;
            }
        } catch (error) {
            // Handle login error
            console.log(error.response.data.error);
            // Show an error message using SweetAlert
            swal('Error', 'Invalid user details. Please try again.', 'error');
        }
    };

    return (
       
        <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image"/>
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form onSubmit={handleLogin}>
          
          <div class="form-outline mb-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label class="form-label" for="form1Example13">Email address</label>
          </div>
          
          <div class="form-outline mb-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label class="form-label" for="form1Example23">Password</label>
          </div>

         <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
                        </form>

                        <div class="text-center">
                            <p>Not a member? <a href="/register">Register</a></p>
                        </div>
      </div>
    </div>
  </div>
</section>
    );
};

export default Login;