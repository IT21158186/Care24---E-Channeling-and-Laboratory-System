import React, { Component } from 'react';
import axios from 'axios';

export default class DeliveryOfMedicineRequests extends Component {

    constructor(props) {
        super(props);

        this.state = {
            medicineDeliveryRequests: [],
            assignedMedicineDeliveryRequests: []
        };
    }


    componentDidMount() {
        this.retrieveMedicineDeliveryRequests();
    }

    retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinedelivery/view").then(res => {
            if (res.data.success) {
                const assignedDeliveryTasks = res.data.existingRequests.filter(request => request.deliveryStatus !== "Cancelled" && request.deliveryStatus !== "Completed" && request.deliveryPersonID === localStorage.getItem("USERID"));

                this.setState({
                    assignedMedicineDeliveryRequests: assignedDeliveryTasks,
                    medicineDeliveryRequests: res.data.existingRequests.filter(request => request.deliveryPersonID === localStorage.getItem("USERID"))
                });
            }
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
        //console.log(e.target.value)
    }



    onUpdate = (id, oID, event) => {
        const newStatus = this.state.newStatus;
        //event.target.value

        const data = {
            //status: event.newStatus
            status: newStatus
        }
        const data2 = {
            deliveryStatus: newStatus
        }

        console.log(data, data2)

        if (!newStatus) {
            alert("Please select a delivery status.");
            return;
        }

        axios.put('http://localhost:4500/medicinerequests/updateStatus/' + oID, data)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        status: ""
                    })
                }

            })
        axios.put('http://localhost:4500/medicinedelivery/edit/' + id, data2)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        deliveryStatus: ""
                    })
                }
                alert("Delivery Updated.");
                this.retrieveMedicineDeliveryRequests();
            })
        
    }

    onCancel = (id, event, oID) => {
        const statusCancel = event.target.value;
        const data1 = {
            status: "Paid",
            deliveryPerson: "N/A"
        }
        const data2 = {
            deliveryStatus: statusCancel
        }

        axios.put('http://localhost:4500/medicinerequests/edit/' + oID, data1).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: "",
                    deliveryPerson: ""
                })
            }
    
        })

        axios.put('http://localhost:4500/medicinedelivery/edit/' + id, data2).then((res) => {
            if (res.data.success) {
                this.setState({
                    deliveryStatus: ""
                })
            }
            alert("Delivery Task Cancelled.");
            this.retrieveMedicineDeliveryRequests();
        })
    }


    render() {
        return (
            <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >

                            <br />
                            <center><h1>Delivery Tasks Assigned by the Pharmacist</h1></center><br />
                            <table className="table table-hover table-dark table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Total Cost (Rs.)</th>
                                        <th scope="col">Delivery Status</th>
                                        <th scope="col">New Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.assignedMedicineDeliveryRequests.map((assignedMedicineDeliveryRequests, index) => (

                                        <tr key={assignedMedicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{assignedMedicineDeliveryRequests.orderID.substring(8, 24)}</td>
                                            <td style={{ minWidth: '200px' }}>{assignedMedicineDeliveryRequests.customerName}</td>
                                            <td>{assignedMedicineDeliveryRequests.deliveryAddress}</td>
                                            <td style={{ minWidth: '175px', maxWidth: '250px', wordWrap: 'break-word' }}>{assignedMedicineDeliveryRequests.customerPhone}</td>
                                            <td style={{ minWidth: '175px' }}>{assignedMedicineDeliveryRequests.orderValue}</td>
                                            <td>{assignedMedicineDeliveryRequests.deliveryStatus}</td>
                                            <td style={{ minWidth: '150px' }}>
                                                <select className="form-select" id="selectStatus" name="newStatus" onChange={this.handleInputChange} required>
                                                    <option></option>
                                                    <option value="Package Dispatched">Package Dispatched</option>
                                                    <option value="Delivering">Delivering</option>
                                                    <option value="Package Returned">Package Returned</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </td>
                                            <td><button type="submit" name="billAmount" className="btn btn-primary" onClick={(event) => this.onUpdate(assignedMedicineDeliveryRequests._id, assignedMedicineDeliveryRequests.orderID, event)}>Submit</button></td>
                                            <td><button type="button" name='btnCancel' value={"Cancelled"} className="btn btn-danger" onClick={(event) => this.onCancel(assignedMedicineDeliveryRequests._id, event, assignedMedicineDeliveryRequests.orderID)}>Cancel</button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br /><br />
                        <center><img src="/images/packageDelivery.png" /></center>
                        <br /><hr />
                        <div >
                            <br /><br />
                            <center><h1>Recent Deliveries</h1></center><br />
                            <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Total Cost (Rs.)</th>
                                        <th scope="col">Delivery Code</th>
                                        <th scope="col">Delivery Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.medicineDeliveryRequests.map((medicineDeliveryRequests, index) => (

                                        <tr key={medicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{medicineDeliveryRequests.orderID.substring(8, 24)}</td>
                                            <td style={{ minWidth: '200px' }}>{medicineDeliveryRequests.customerName}</td>
                                            <td>{medicineDeliveryRequests.deliveryAddress}</td>
                                            <td style={{ minWidth: '175px', maxWidth: '250px', wordWrap: 'break-word' }}>{medicineDeliveryRequests.customerPhone}</td>
                                            <td style={{ minWidth: '175px' }}>{medicineDeliveryRequests.orderValue}</td>
                                            <td>{medicineDeliveryRequests._id}</td>
                                            <td className='table-active table-success' style={{ minWidth: '150px' }}>{medicineDeliveryRequests.deliveryStatus}</td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                            <br /><br />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
