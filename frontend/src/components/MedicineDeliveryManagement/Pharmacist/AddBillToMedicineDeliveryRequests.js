import React, { Component } from 'react'
import axios from 'axios';

export default class AddBillToMedicineDeliveryRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //medicineDeliveryRequests: [],
            //approvedBilledMedicineDeliveryRequests: [],
            //approvedMedicineDeliveryRequests: []
            billMedicineDeliveryRequests: []
        };
    }


    componentDidMount() {
        this.retrieveMedicineDeliveryRequests();
    }

    retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinerequests").then(res => {
            if (res.data.success) {
                const existingBillingRequests = res.data.existingRequests.filter(request => request.status == "In Review");
                this.setState({
                    billMedicineDeliveryRequests: existingBillingRequests
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
      }


    onBillSubmit = (id, event) => {
        const statusReqPayment = "Approved";
        const statusPayment = "Payment Required"
        const billedAmount = this.state.billedAmount;
        const data = {
            status: statusReqPayment,
            orderCost: billedAmount ,
            paymentStatus: statusPayment
        }

        if (!billedAmount) {
            alert("Please enter the price...");
            return;
          }

        axios.put('http://localhost:4500/medicinerequests/edit/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: "",
                    orderCost: "",
                    paymentStatus: ""
                })

            }
            alert("Cost updated.");
            this.retrieveMedicineDeliveryRequests();
        })
    }



    render() {
        return (
            <div className=' dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >

                            <br />
                            <center><h1>Approved Orders | BILLING</h1></center><br /><hr />
                            <table className="table table-dark table-hover table-bordered" style={{ width: 'auto', align: 'center', margin:'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Prescription Details</th>
                                        <th style={{ textAlign: 'center' }}><i className="fa fa-download" aria-hidden="true"></i></th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Total Cost (Rs.)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.billMedicineDeliveryRequests.map((billMedicineDeliveryRequests, index) => (

                                        <tr key={billMedicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{billMedicineDeliveryRequests._id.substring(8, 24)}</td>
                                            <td style={{ minWidth: '200px'}}>{billMedicineDeliveryRequests.name}</td>
                                            <td>{billMedicineDeliveryRequests.userID}</td>
                                            <td style={{ minWidth: '175px', maxWidth: '250px', wordWrap: 'break-word' }}>{billMedicineDeliveryRequests.prescriptionDetails}</td>
                                            <td style={{ textAlign: 'center' }}>{billMedicineDeliveryRequests.prescriptionFile ?
                                                <a href={billMedicineDeliveryRequests.prescriptionFile} download>Download</a> :
                                                <span></span>
                                            }</td>
                                            <td style={{ minWidth: '175px'}}>{billMedicineDeliveryRequests.deliveryAddress}</td>
                                            <td className="table-warning"><input type='number' name='billedAmount' defaultValue={billMedicineDeliveryRequests.orderCost} onChange={this.handleInputChange}/></td>

                                            <td><button type="submit" name="billAmount" className="btn btn-primary" onClick={(event) => this.onBillSubmit(billMedicineDeliveryRequests._id, event)}>Submit</button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div >

                            <br />
                            <center><img src="/images/PharmacistBilling.png" style={{ maxWidth: '500px' }}/></center>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
