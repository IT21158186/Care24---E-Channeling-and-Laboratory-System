import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Shows Details of All Users
class ViewUsers extends Component{
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    retrieveUsers() {
        axios.get("/users").then(res => {
            if (res.data.success) {
                this.setState({
                    users: res.data.existingUsers
                });

                console.log(this.state.users)
            }
        });
    }

    onDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`/user/delete/${id}`).then((res) => {
                alert("User Delete Successfully !");
                this.retrieveUsers();
            })
        }
    }

    filterData(users, searchKey) {

        const result = users.filter((user) =>
            user.userType.toLowerCase().includes(searchKey)     ||
            user.nicNumber.toLowerCase().includes(searchKey)    ||
            user.mobileNumber.toLowerCase().includes(searchKey) ||
            user.email.toLowerCase().includes(searchKey)
        )

        this.setState({ users: result })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get("/users").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingUsers, searchKey)
            }
        });
    }

    jsPdfGenerator = () => {
        //new document in jspdf
        var doc = new jsPDF('l', 'pt', 'a4');

        doc.text(210, 30, "All User Details")

        // Exclude columns 0 and 5 from the table
        var tableOptions = {
            html: '#allUserTable',
            columns: [1, 2, 3, 4]
        };

        doc.autoTable(tableOptions);

        doc.autoTable({
            columnStyles: { europe: { halign: 'center' } },
            margin: { top: 10 },
        })

        //save the pdf
        doc.save("All User Details.pdf");
    }
    jsPdfGenerator = () => {
        //new document in jspdf
        var doc = new jsPDF('l', 'pt', 'a4');

        doc.text(210, 30, "All User Details")

        // Exclude columns 0 and 8 from the table
        var tableOptions = {
            html: '#allUserTable',
            columns: [1, 2, 3, 4, 5 ,6 ,7, 8]
        };

        doc.autoTable(tableOptions);

        doc.autoTable({
            columnStyles: { europe: { halign: 'center' } },
            margin: { top: 10 },
        })

        //save the pdf
        doc.save("All User Details.pdf");
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 mt-2 mb-2">
                        <h2>All Users</h2>
                    </div>
                    <div className="col-lg-3 mt-2 mb-2">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="searchUser"
                            onChange={this.handleSearchArea}>
                        </input>
                    </div>
                </div>

                <table className="table" id="allUserTable">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">User Type</th>
                            <th scope="col">NIC Number</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((users, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{users.title}</td>
                                <td>
                                    <a href={`/users/${users._id}`} style={{ textDecoration: 'none' }}>
                                        {users.firstName}
                                    </a>
                                </td>
                                <td>{users.lastName}</td>
                                <td>{users.userType}</td>
                                <td>{users.nicNumber}</td>
                                <td>{users.mobileNumber}</td>
                                <td>{users.email}</td>
                                <td>
                                    <a className="btn btn-warning" href={`/editUsers/${users._id}`} style={{ width: '120px', height: '40px' }}>
                                        <i className="fas fa-edit"></i>&nbsp;Edit
                                    </a>
                                </td>

                                <td>                      
                                    <a className="btn btn-danger" href="#" onClick={() => this.onDelete(users._id)} style={{ width: '120px', height: '40px' }}>
                                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br/>

                <button className="btn btn-success" variant="primary">
                    <a href="/addUsers" style={{ width: '150px', height: '40px', textDecoration: 'none', color: 'white' }} >
                        Add New User
                    </a>
                </button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <button onClick={this.jsPdfGenerator} type="button" class="btn btn-primary" style={{ width: '150px', height: '40px' }}>PDF Report</button>

                <br/><br/><br/>

            </div>
        )
    }
}

export default ViewUsers;