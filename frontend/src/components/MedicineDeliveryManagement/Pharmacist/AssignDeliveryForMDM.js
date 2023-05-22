import React, { Component } from 'react'
import axios from 'axios';

export default class AssignDeliveryForMDM extends Component {
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
                const existingBillingRequests = res.data.existingRequests.filter(request => request.status === "Paid");
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


    onAssign = (id, event) => {
        
        
        const statusDelivery = "Delivery in Progress";
        const deliverer = this.state.deliverer;
        let delivererID = null;
        if (deliverer=="Deliverer 01") {
            delivererID = "6466bd1c4546b6d5f573ac99";
        }
        else if(deliverer=="Deliverer 02"){
            delivererID = "6466bdc94546b6d5f573aca1";
        }
        else if(deliverer=="Deliverer 03"){
            delivererID = "6466bde74546b6d5f573aca5";
        }
        else if(deliverer=="Deliverer 04"){
            delivererID = "6466be024546b6d5f573aca9";
        }
        else if(deliverer=="Deliverer 05"){
            delivererID = "6466be214546b6d5f573acad";
        }

        const data = {
            status: statusDelivery,
            deliveryPerson: deliverer
        }

        axios.put('http://localhost:4500/medicinerequests/edit/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: "",
                    deliveryPerson: ""
                })
                
            }
            alert("Delivery person assigned.");
            
        })

        const data2 = {
            customerName: event.name,
            orderID: event._id,
            customerPhone: event.phone,
            deliveryAddress: event.deliveryAddress,
            deliveryCity: event.deliveryCity,
            orderValue: event.orderCost,
            date: new Date(),
            deliveryStatus: statusDelivery,
            delivererName: deliverer,
            deliveryPersonID : delivererID
        }
        console.log(data2)

        if (!deliverer) {
            alert("Please assign a delivery person.");
            return;
          }


        axios.post("http://localhost:4500/newmedicinerequest/delivery/create", data2)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        customerName: "",
                        orderID: "",
                        customerPhone: "",
                        deliveryAddress: "",
                        deliveryCity: "",
                        orderValue: "",
                        date: "",
                        deliveryStatus: "",
                        delivererName: "",
                        delivererID: ""
                    })
                    //alert("Medicine Delivery Request Successful.");
                    this.retrieveMedicineDeliveryRequests();
                }
            })
            .catch((err) => {
                console.error(err);
            });

            
    }



    render() {
        return (
            <div className=' dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >

                            <br />
                            <center><h1>Delivery Assignment</h1></center><br /><hr />
                            <table className="table table-dark table-hover table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
                                <thead  className="">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Cost (Rs.)</th>
                                        <th scope="col">Delivery Person</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.billMedicineDeliveryRequests.map((billMedicineDeliveryRequests, index) => (

                                        <tr key={billMedicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{billMedicineDeliveryRequests._id.substring(8, 24)}</td>
                                            <td style={{ minWidth: '200px' }}>{billMedicineDeliveryRequests.name}</td>
                                            <td></td>
                                            <td style={{ minWidth: '175px' }}>{billMedicineDeliveryRequests.deliveryAddress}</td>
                                            <td style={{ minWidth: '175px' }}>{billMedicineDeliveryRequests.orderCost}</td>
                                            <td style={{ minWidth: '150px' }}>
                                                <select className="form-select" id="selectDeliverer" name="deliverer" onChange={this.handleInputChange} required>
                                                    <option></option>
                                                    <option value="Deliverer 01">Deliverer 01</option>
                                                    <option value="Deliverer 02">Deliverer 02</option>
                                                    <option value="Deliverer 03">Deliverer 03</option>
                                                    <option value="Deliverer 04">Deliverer 04</option>
                                                    <option value="Deliverer 05">Deliverer 05</option>
                                                </select>
                                            </td>

                                            <td><button type="button" name="billAmount" className="btn btn-outline-primary" onClick={() => this.onAssign(billMedicineDeliveryRequests._id, billMedicineDeliveryRequests)}>Assign</button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div >
                        <br /><br />
                        <center><img src="/images/Deliverer.png" style={{ maxWidth: '300px', align: 'center' }}/></center>
                            <br /><br />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
