import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";


export default class ViewMedicineDeliveryRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicineDeliveryRequests: [],
            dataForChart: []
        };
    }

    /*
    RETRIEVE ALL ORDERS
    
        componentDidMount() {
            this.retrieveMedicineDeliveryRequests();
        }
    
        retrieveMedicineDeliveryRequests() {
            axios.get("http://localhost:4500/medicinerequests").then(res => {
                if (res.data.success) {
                    this.setState({
                        medicineDeliveryRequests: res.data.existingRequests
                    });
                    //console.log(this.setState.medicineDeliveryRequests);
                }
            });
        } */
    componentDidMount() {
        this.retrieveMedicineDeliveryRequests();
    }

    retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinerequests").then(res => {
            if (res.data.success) {
                const existingNewRequests = res.data.existingRequests.filter(request => request.status == "Pending");
                this.setState({
                    medicineDeliveryRequests: existingNewRequests,
                    dataForChart: res.data.existingRequests
                });
                //console.log(this.setState.medicineDeliveryRequests);
            }
        });
    }


    onAccept_or_Reject = (id, event) => {
        const statusInReviewORRejected = event;
        const data = {
            status: statusInReviewORRejected
        }

        axios.put('http://localhost:4500/medicinerequests/updateStatus/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: ""
                })
            }
            alert("Order status updated.");
            this.retrieveMedicineDeliveryRequests();
        })
    }


    onDelete = (id) => {
        axios.delete('http://localhost:4500/medicinerequests/remove/' + id).then((res) => {
            alert("Deletion successful.");
            this.retrieveMedicineDeliveryRequests();
        })
    }



    generateChart(getting) {

        const data = this.state.dataForChart;

        const counts = data.reduce(
            (acc, curr) => {
                switch (curr.status) {
                    case 'Pending':
                        acc.pendingCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.pendingAboveAgeCount++;
                        } else {
                            acc.pendingBelowAgeCount++;
                        }
                        break;
                    case 'Rejected':
                        acc.rejectedCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.rejectedAboveAgeCount++;
                        } else {
                            acc.rejectedBelowAgeCount++;
                        }
                        break;
                    case 'Cancelled':
                        acc.cancelledCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.cancelledAboveAgeCount++;
                        } else {
                            acc.cancelledBelowAgeCount++;
                        }
                        break;
                    case 'In Review':
                        acc.inReviewCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.inReviewAboveAgeCount++;
                        } else {
                            acc.inReviewBelowAgeCount++;
                        }
                        break;
                    case 'Approved':
                        acc.approvedCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.approvedAboveAgeCount++;
                        } else {
                            acc.approvedBelowAgeCount++;
                        }
                        break;
                    case 'Paid':
                        acc.paidCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.paidAboveAgeCount++;
                        } else {
                            acc.paidBelowAgeCount++;
                        }
                        break;
                    case 'Delivery in Progress':
                        acc.inDeliveryCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.inDeliveryAboveAgeCount++;
                        } else {
                            acc.inDeliveryBelowAgeCount++;
                        }
                        break;
                    case 'Completed':
                        acc.completedCount++;
                        if (parseInt(curr.age, 10) > 21) {
                            acc.completedAboveAgeCount++;
                        } else {
                            acc.completedBelowAgeCount++;
                        }
                        break;
                    default:
                        break;
                }
                return acc;
            },
            {
                pendingCount: 0,
                rejectedCount: 0,
                cancelledCount: 0,
                inReviewCount: 0,
                approvedCount: 0,
                paidCount: 0,
                inDeliveryCount: 0,
                completedCount: 0,

                pendingAboveAgeCount: 0,
                rejectedAboveAgeCount: 0,
                cancelledAboveAgeCount: 0,
                inReviewAboveAgeCount: 0,
                approvedAboveAgeCount: 0,
                paidAboveAgeCount: 0,
                inDeliveryAboveAgeCount: 0,
                completedAboveAgeCount: 0,

                pendingBelowAgeCount: 0,
                rejectedBelowAgeCount: 0,
                cancelledBelowAgeCount: 0,
                inReviewBelowAgeCount: 0,
                approvedBelowAgeCount: 0,
                paidBelowAgeCount: 0,
                inDeliveryBelowAgeCount: 0,
                completedBelowAgeCount: 0
            }
        );

        const chartData = [
            [
                "Status",
                "Orders",
                "Orders from people over 21 years old",
                "Orders from people 21 years old & below",
            ],
            ["Pending", counts.pendingCount, counts.pendingAboveAgeCount, counts.pendingBelowAgeCount],
            ["Rejected", counts.rejectedCount, counts.rejectedAboveAgeCount, counts.rejectedBelowAgeCount],
            ["Cancelled", counts.cancelledCount, counts.cancelledAboveAgeCount, counts.cancelledBelowAgeCount],
            ["In Review", counts.inReviewCount, counts.inReviewAboveAgeCount, counts.inReviewBelowAgeCount],
            ["Approved", counts.approvedCount, counts.approvedAboveAgeCount, counts.approvedBelowAgeCount],
            ["Paid", counts.paidCount, counts.paidAboveAgeCount, counts.paidBelowAgeCount],
            ["Delivery in Progress", counts.inDeliveryCount, counts.inDeliveryAboveAgeCount, counts.inDeliveryBelowAgeCount],
            ["Completed", counts.completedCount, counts.completedAboveAgeCount, counts.completedBelowAgeCount],
        ];

        const options = {
            title: "A Summary of Medicine Delivery Requests Statuses",
            vAxis: { title: "Total Amount" },
            hAxis: { title: "Current Status" },
            seriesType: "bars",
            series: { 1: { type: "line" }, 2: { type: 'line' } },
            colors: ["#0cc96b", "#3366CC", "#FF9900"]
        };
        if (getting == "data") {
            return chartData
        }
        if (getting == "options") {
            return options
        }
    }




    render() {
        return (


            <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >

                            <br /><br /><br />
                            <center><h1>Medicine Delivery Requests</h1></center><br /><hr />
                            <table className="table table-hover table-bordered" >
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Prescription Details</th>
                                        <th style={{ textAlign: 'center' }}><i className="fa fa-download" aria-hidden="true"></i></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.medicineDeliveryRequests.map((medicineDeliveryRequests, index) => (

                                        <tr key={medicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{medicineDeliveryRequests._id}</td>
                                            <td>{medicineDeliveryRequests.name}</td>
                                            <td>{medicineDeliveryRequests.age}</td>
                                            <td>{medicineDeliveryRequests.gender}</td>
                                            <td>{medicineDeliveryRequests.deliveryAddress}</td>
                                            <td>{medicineDeliveryRequests.phone}</td>
                                            <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{medicineDeliveryRequests.prescriptionDetails}</td>
                                            <td style={{ textAlign: 'center' }}>{medicineDeliveryRequests.prescriptionFile ?
                                                <a href={medicineDeliveryRequests.prescriptionFile} download>Download</a> :
                                                <span>No file available.</span>
                                            }</td>

                                            <td><button type="button" name="statusInReviewORRejected" className="btn btn-success" onClick={() => this.onAccept_or_Reject(medicineDeliveryRequests._id, "In Review")}><i className="fa fa-check" aria-hidden="true">&nbsp;&nbsp;Approve</i></button></td>
                                            <td><button type="button" name="statusInReviewORRejected" className="btn btn-warning" onClick={() => this.onAccept_or_Reject(medicineDeliveryRequests._id, "Rejected")}><i className="fa fa-times" aria-hidden="true">&nbsp;&nbsp;Reject</i></button></td>
                                            <td><button type="button" className="btn btn-danger" onClick={() => this.onDelete(medicineDeliveryRequests._id)}><i className="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;Delete</i></button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <br/><br/>
                        <center>
                            <Chart
                                chartType="ComboChart"
                                width="80%"
                                height="450px"
                                data={this.generateChart("data")}
                                options={this.generateChart("options")}
                            />
                        </center>



                    </div>
                </div>
            </div>


        )
    }
}
