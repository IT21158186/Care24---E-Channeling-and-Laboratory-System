import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

//Create New User
export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            firstName: "",
            lastName: "",
            userType: "user",
            nicNumber: "",
            mobileNumber: "",
            email: "",
            address: "",
            password: "",
            confirmPassword: ""
        }
  }

    handleChange = (event) => {
        this.setState({ status: event.target.value });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onClick = () => {
        this.setState({
            title: "",
            firstName: "",
            lastName: "",
            userType: "user",
            nicNumber: "",
            mobileNumber: "",
            email: "",
            address: "",
            password: "",
            confirmPassword: ""
        });
    }


    onSubmit = () => {
        const {
            title,
            firstName,
            lastName,
            userType,
            nicNumber,
            mobileNumber,
            email,
            address,
            password,
            confirmPassword,
        } = this.state;

        // Validation checks...

        // If validation passes, proceed with form submission
        const data = {
            title,
            firstName,
            lastName,
            userType,
            nicNumber,
            mobileNumber,
            email,
            address,
            password,
            confirmPassword,
        };

        axios.post("/users/add", data)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        title: "",
                        firstName: "",
                        lastName: "",
                        userType: "user",
                        nicNumber: "",
                        mobileNumber: "",
                        email: "",
                        address: "",
                        password: "",
                        confirmPassword: "",
                    });
                    swal({
                        text: "New User Successfully Added",
                        icon: "success",
                        button: "Okay!",
                    }).then((value) => {
                        window.location = "/AllUsers";
                    });
                }
            })
            .catch((error) => {
                // Handle error if the request fails
                console.log(error);
                swal("Error", "Failed to add new user", "error");
            });
    };



    render() {
        const { status } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2">
                            <h2>Create User</h2>
                        </div>
                        <br />
                        <div>                        
                            <table className="table" >
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>                                    
                                            <label><strong>Title:</strong></label>
                                            <select id="title" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} >
                                                <option>--Select--</option>
                                                <option >Mr</option>
                                                <option>Mrs</option>
                                                <option>Mast</option>
                                                <option>Miss</option>
                                                <option>Dr</option>
                                                <option>Dr(Mrs)</option>
                                                <option>Dr(Ms)</option>
                                                <option>Prof</option>
                                                <option>Prof(Mrs)</option>
                                                <option>Prof(Ms)</option>
                                                <option>Rev</option>
                                                <option>Sis</option>
                                                <option>Hon</option>
                                                <option>Ms</option>
                                                <option>Baby</option>
                                            </select>
                                        </td>
                                        <td>
                                            <label htmlFor="inputFirstName"><strong>First Name</strong></label>
                                            <input type="text" className="form-control" name="firstName" id="inputFirstName" placeholder="" value={this.state.firstName} onChange={this.handleInputChange} />
                                        </td>                                    
                                        <td>                                    
                                            <label htmlFor="inputLastName"><strong>Last Name</strong></label>
                                            <input type="text" className="form-control" name="lastName" id="inputLastName" placeholder="" value={this.state.lastName} onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>                                    
                                            <label htmlFor="userType"><strong>User Type</strong></label>
                                            <select id="userType" className="form-control" name="userType" value={this.state.userType} onChange={this.handleInputChange} >
                                                 /** please add your user type hear */
                                                <option>user</option>
                                                <option>admin</option>
                                                <option>Pharmacist</option>
                                                <option>Delivery Person</option>

                                            </select>
                                        </td>
                                        <td>                                    
                                            <label htmlFor="inputNIC"><strong>NIC Number</strong></label>
                                            <input type="text" className="form-control" id="inputNIC" name="nicNumber" placeholder="" value={this.state.nicNumber} onChange={this.handleInputChange} />
                                        </td>
                                        <td>                                    
                                            <label htmlFor="inputMobileNumber"><strong>Mobile Number</strong></label>
                                            <input type="text" className="form-control" id="inputMobileNumber" name="mobileNumber" placeholder="" value={this.state.mobileNumber} onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={3}>
                                            <label htmlFor="inputEmail"><strong>Email</strong></label>
                                            <input type="email" className="form-control" id="inputEmail" name="email" placeholder="" value={this.state.email} onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={3}>
                                            <label htmlFor="inputAddress"><strong>Address</strong></label>
                                            <input type="text" className="form-control" id="inputAddress" name="address" placeholder="" value={this.state.address} onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="inputPassword"><strong>Password</strong></label>
                                            <input type="password" className="form-control" id="inputPassword" name="password" placeholder="" value={this.state.password} onChange={this.handleInputChange} />
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <label htmlFor="inputConfirmPassword"><strong>Confirm Password</strong></label>
                                            <input type="password" className="form-control" id="inputConfirmPassword" name="confirmPassword" placeholder="" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>                                    
                                            <button className="btn btn-success" type="submit" style={{ width: '120px', height: '40px' }} onClick={this.onSubmit}>
                                                <i className="far fa-check-square"></i>
                                                Add
                                            </button>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <button type="button" style={{ width: '120px', height: '40px' }} onClick={this.onClick} className="btn btn-warning">
                                                <i className="fa fa-close"></i>
                                                Cancel
                                            </button>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


