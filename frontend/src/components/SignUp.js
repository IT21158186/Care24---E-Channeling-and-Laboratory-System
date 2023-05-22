import React, { useState, Component } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [fullname, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password should be at least 8 characters long.");
            return;
        }

        setIsSigningUp(true);

        axios
            .post("http://localhost:4500/signup", {
                fullname: fullname,
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    alert("Signup success.");
                    window.location.href = '/signin';
                    localStorage.setItem("TOKEN", res.data.token);
                    localStorage.setItem("USERID", res.data.user._id);
                    localStorage.setItem("NAME", res.data.user.fullname);
                    localStorage.setItem("EMAIL", res.data.user.email);
                    localStorage.setItem("USERTYPE", res.data.user.usertype);
                } else {
                    alert("Error.");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsSigningUp(false);
            });
    };

    return (
        <>  <div className='dashboard'>
            <div className='dashboard-app'>
                <div className='dashboard-content'>
                    <h1 className="center"> SIGNUP </h1>
                    <form>
                    <div className="outcard">
                        <div className="row">
                            <div className="column form-group">
                                Username
                                <input
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    value={fullname}
                                    className="inputs form-control"
                                    type="text"
                                />{" "}
                                <br /> <br />
                            </div>
                            <div className="column form-group">
                                Email
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    className="inputs form-control"
                                    type="text"
                                    autoComplete="off"
                                />{" "}
                                <br /> <br />
                                Password
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                    className="inputs form-control"
                                    type="password"
                                />{" "}
                                <br /> <br />
                                Password
                                <input
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                    value={confirmPassword}
                                    className="inputs form-control"
                                    type="password"
                                />{" "}
                                <br /> <br />
                                {error && <span className="error">{error}</span>}
                            </div>
                        </div>
                        <div className="row form-group">
                            <button
                                onClick={handleSubmit}
                                className="btns btn btn-primary"
                                disabled={isSigningUp}
                            >
                                {isSigningUp ? "Signing up..." : "Sign Up"}
                            </button>
                        </div>
                        
                        <Link
                            style={{ textAlign: "center", display: "block", marginTop: "5px" }}
                            to={"/signin"}
                        >
                            {" "}
                            SIGN IN{" "}
                        </Link>
                    </div></form>
                </div></div></div>
        </>
    );
}

export default Signup;
