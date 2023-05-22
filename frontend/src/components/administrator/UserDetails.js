import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import swal from 'sweetalert';

export default class UserDetails extends Component {

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
            address: ""
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
                    address: res.data.user.address

                });
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
                            <h2>User Details</h2>
                        </div>
                        <br />
                        <div>
                            <table className="table" id="userDetailsTable" >
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
                                            <select id="title" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} disabled="true" >
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
                                            <input type="text" className="form-control" name="firstName" id="inputFirstName" placeholder="" value={this.state.firstName} onChange={this.handleInputChange} disabled />
                                        </td>
                                        <td>
                                            <label htmlFor="inputLastName"><strong>Last Name</strong></label>
                                            <input type="text" className="form-control" name="lastName" id="inputLastName" placeholder="" value={this.state.lastName} onChange={this.handleInputChange} disabled />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="userType"><strong>User Type</strong></label>
                                            <select id="userType" className="form-control" name="userType" value={this.state.userType} onChange={this.handleInputChange} disabled="true" >
                                                <option>user</option>
                                                <option>admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <label htmlFor="inputNIC"><strong>NIC Number</strong></label>
                                            <input type="text" className="form-control" id="inputNIC" name="nicNumber" placeholder="" value={this.state.nicNumber} onChange={this.handleInputChange} disabled />
                                        </td>
                                        <td>
                                            <label htmlFor="inputMobileNumber"><strong>Mobile Number</strong></label>
                                            <input type="text" className="form-control" id="inputMobileNumber" name="mobileNumber" placeholder="" value={this.state.mobileNumber} onChange={this.handleInputChange} disabled />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={3}>
                                            <label htmlFor="inputEmail"><strong>Email</strong></label>
                                            <input type="email" className="form-control" id="inputEmail" name="email" placeholder="" value={this.state.email} onChange={this.handleInputChange} disabled />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={3}>
                                            <label htmlFor="inputAddress"><strong>Address</strong></label>
                                            <input type="text" className="form-control" id="inputAddress" name="address" placeholder="" value={this.state.address} onChange={this.handleInputChange} disabled />
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