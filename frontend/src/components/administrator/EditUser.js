import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class EditUser extends Component{

// Make changes to the users
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

    onSubmit = (e) => {

        e.preventDefault();
        const id = this.props.match.params.id;

        const { title, firstName, lastName, userType, nicNumber, mobileNumber, email, address, password, confirmPassword } = this.state;

        const data = {
            title: title,
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            nicNumber: nicNumber,
            mobileNumber: mobileNumber,
            email: email,
            address: address,
            password: password,
            confirmPassword: confirmPassword
        }
 
        console.log(data)

// Validation

        const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (
            title.length === 0 ||
            firstName.length === 0 ||
            lastName.length === 0 ||
            userType.length === 0 ||
            nicNumber.length === 0 ||
            mobileNumber.length === 0 ||
            email.length === 0 ||
            address.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
        ) {

            swal(" Fields Cannot empty !", "Please enter all data !", "error");

        } else if (mobileNumber.length !== 10) {

            swal("Invalid  Mobile Number !", "Mobile Number should be 10 digit !", "error");
        }

        else {

            axios.put(`/users/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    this.setState(
                        {
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
                    )
                }
            });

            swal({
                title: "Done!",
                text: "Update Successful",
                icon: "success",
                button: "Okay!"
            })

                .then((value) => {
                    window.location = '/AllUsers'; 
                });
        }
    }


    componentDidMount() {

        const id = this.props.match.params.id;

        axios.get(`/users/${id}`).then((res) => {

            if (res.data.success) {
                this.setState({
         
                    title: res.data.user.title,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    userType: res.data.user.userType,
                    nicNumber: res.data.user.nicNumber,
                    mobileNumber: res.data.user.mobileNumber,
                    email: res.data.user.email,
                    address: res.data.user.address,
                    password: res.data.user.password,
                    confirmPassword: res.data.user.confirmPassword

                });

                console.log(this.state.post);

            }
        })
    }


    render() {
        const { status } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2">
                            <h2>Edit User</h2>
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
                                            <button className="btn btn-success" type="submit" style={{ width: '150px', height: '40px' }} onClick={this.onSubmit}>
                                                <i className="far fa-check-square"></i>
                                                Update User
                                            </button>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <a href="#"><button type="button" style={{ width: '150px', height: '40px' }} onClick={() => { window.location.reload(); }} class="btn btn-warning"><i class="fa fa-close"></i>Cancel</button></a>
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