import React, { Component } from 'react';
import axios from 'axios';

export default class ViewMedicineDeliveryRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicineDeliveryRequests: [],
            approvedBilledMedicineDeliveryRequests: [],
        };
    }


    componentDidMount() {
        this.retrieveMedicineDeliveryRequests();
    }

    /*retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinerequests").then(res => {
            if (res.data.success) {
                const existingBilledRequests = res.data.existingRequests.filter(request => request.orderCost !== null && request.status !== "Pending" && request.status !== "Cancelled" && request.paymentStatus === "Payment Required" && request.status === "Approved");
                this.setState({
                    approvedBilledMedicineDeliveryRequests: existingBilledRequests,
                    medicineDeliveryRequests: res.data.existingRequests
                });
                console.log(this.state.medicineDeliveryRequests, this.state.approvedBilledMedicineDeliveryRequests);
            }
        });
    }*/
    retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinerequests/"+localStorage.getItem("USERID")).then(res => {
            if (res.data.success) {
                const existingBilledRequests = res.data.existingRequests.filter(request => request.orderCost !== null && request.status !== "Pending" && request.status !== "Cancelled" && request.paymentStatus === "Payment Required" && request.status === "Approved");
                this.setState({
                    approvedBilledMedicineDeliveryRequests: existingBilledRequests,
                    medicineDeliveryRequests: res.data.existingRequests
                });
                console.log(this.state.medicineDeliveryRequests, this.state.approvedBilledMedicineDeliveryRequests);
            }
        });
    }



    onPay = (id, event) => {
        const statusPayment = event.target.value;
        const statusPaymentInfo = "Payment Successful"
        const data = {
            status: statusPayment,
            paymentStatus: statusPaymentInfo
        }

        axios.put('http://localhost:4500/medicinerequests/edit/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: "",
                    paymentStatus: ""
                })
            }
            alert("Payment successfull! Your order will be proccessed soon...");
            this.retrieveMedicineDeliveryRequests();
        })
    }

    onCancel = (id, event) => {
        const statusCancel = event.target.value;
        const data = {
            status: statusCancel
        }

        axios.put('http://localhost:4500/medicinerequests/updateStatus/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: ""
                })
            }
            alert("Medicine Request Cancelled.");
            this.retrieveMedicineDeliveryRequests();
        })
    }




    render() {
        return (

            //<div className='container dashboard'>
            <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >

                            <br /><br /><br />
                            <center><h1>Medicine Delivery Requests</h1></center><br />
                            {this.state.approvedBilledMedicineDeliveryRequests.length > 0 &&
                                <table className="table table-hover table-bordered" style={{ width: 'auto', margin: 'auto' }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Medicines Information</th>
                                            <th scope="col">Prescription</th>
                                            <th scope="col">Bill Amount (LKR)</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.approvedBilledMedicineDeliveryRequests.map((approvedBilledMedicineDeliveryRequests, index) => (

                                            <tr key={approvedBilledMedicineDeliveryRequests._id}>

                                                <td><i>Action needed</i></td>
                                                <td>{approvedBilledMedicineDeliveryRequests._id}</td>
                                                <td>{approvedBilledMedicineDeliveryRequests.orderDate.substring(0, 10)}</td>
                                                <td>{approvedBilledMedicineDeliveryRequests.prescriptionDetails ? approvedBilledMedicineDeliveryRequests.prescriptionDetails : <span>N/A</span>}</td>
                                                <td><center>{approvedBilledMedicineDeliveryRequests.prescriptionFile ?
                                                    <a href={approvedBilledMedicineDeliveryRequests.prescriptionFile} download>Download</a> :
                                                    <span>N/A</span>
                                                }</center></td>
                                                <td><center>{approvedBilledMedicineDeliveryRequests.orderCost}</center></td>

                                                <td><button type="button" name='btnPay' value={"Paid"} className="btn btn-primary" onClick={(event) => this.onPay(approvedBilledMedicineDeliveryRequests._id, event)} >PAY</button></td>
                                                <td><button type="button" name='btnCancel' value={"Cancelled"} className="btn btn-danger" onClick={(event) => this.onCancel(approvedBilledMedicineDeliveryRequests._id, event)}>CANCEL</button></td>

                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            }
                        </div>

                        <div >

                            <br /><br /><hr />
                            <center><h2>Track Status</h2></center><br />
                            <table className="table table-bordered" >
                                <thead >
                                    <tr className='table-dark'>
                                        <th scope="col">#</th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Date & Time</th>
                                        <th scope="col">Payment Info</th>
                                        <th scope="col"><center>Status</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.medicineDeliveryRequests.map((approvedMedicineDeliveryRequests, index) => (

                                        <tr key={approvedMedicineDeliveryRequests._id}>

                                            <td className='table-dark' scope="row">{index + 1}</td>
                                            <td>{approvedMedicineDeliveryRequests._id}</td>
                                            <td>{approvedMedicineDeliveryRequests.orderDate.substring(0, 16)}</td>
                                            <td>{approvedMedicineDeliveryRequests.paymentStatus}</td>
                                            <td className={`table-warning ${approvedMedicineDeliveryRequests.status === 'Cancelled' || approvedMedicineDeliveryRequests.status === 'Rejected' ? 'text-danger' : approvedMedicineDeliveryRequests.status === 'Completed' ? 'text-success' : approvedMedicineDeliveryRequests.status === 'Approved' ? 'text-success' : approvedMedicineDeliveryRequests.status === 'Delivery in Progress' || approvedMedicineDeliveryRequests.status === 'Paid' ? 'text-primary' : ''}`}><center><b>{approvedMedicineDeliveryRequests.status}</b></center></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>



                    </div>
                </div>
            </div>


        )
    }
}
