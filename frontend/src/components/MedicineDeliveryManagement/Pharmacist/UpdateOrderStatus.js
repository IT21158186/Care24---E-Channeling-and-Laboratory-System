import React, { Component } from 'react'
import axios from 'axios';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import logo from '../../images/Care24_Logo.png'

export default class UpdateOrderStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicineDeliveryRequests: [],
            processingMedicineDeliveryRequests: [],
            toBeDoneMDRs: [],
            allMedicineDeliveryRequests: []
        };
    }


    componentDidMount() {
        this.retrieveMedicineDeliveryRequests();
    }

    retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinerequests").then(res => {
            if (res.data.success) {
                const mediRequests = res.data.existingRequests.filter(request => request.status === "Pending" || request.status === "In Review" || request.status === "Approved" || request.status === "In Preparation");
                const doneMediRequests = res.data.existingRequests.filter(request => request.status === "Cancelled" || request.status === "Rejected" || request.status === "Completed");
                const toBeCompletedMediRequests = res.data.existingRequests.filter(request => request.status === "Paid" || request.status === "Delivery in Progress" || request.status === "Payment Required");
                this.setState({
                    processingMedicineDeliveryRequests: mediRequests,
                    toBeDoneMDRs: toBeCompletedMediRequests,
                    medicineDeliveryRequests: doneMediRequests,
                    allMedicineDeliveryRequests: res.data.existingRequests
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
    /*
        createAndDownloadPDF = () => {
            axios.post('http://localhost:4500/create-pdf', this.state)
                .then(() => axios.get('http://localhost:4500/fetch-pdf', { responseType: 'blob' }))
                .then((res) => {
                    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
                    saveAs(pdfBlob, 'newPDF.pdf');
                })
        }
    */
    generatePDF = () => {

        const medicineDeliveryRequests = this.state.allMedicineDeliveryRequests;

        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

        doc.text(305, 20, 'Medicine Delivery Requests Details', 'center');

        // Add the logo
        const imgData = logo;
        doc.addImage(imgData, 'png', 20, 10, 80, 30);
        doc.output('data_url');

        const head = [['Order ID', 'Patient Name', 'Phone',
            'Age', 'Address', 'Date', 'Order Status']];

        const elements = medicineDeliveryRequests.map(medicineDeliveryRequests => [
            medicineDeliveryRequests._id, medicineDeliveryRequests.name, medicineDeliveryRequests.phone,
            medicineDeliveryRequests.age, medicineDeliveryRequests.deliveryAddress, medicineDeliveryRequests.orderDate.substring(0, 10), medicineDeliveryRequests.status]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("Medicine_Delivery_Requests.pdf");
    }



    onUpdate = (id, event) => {

        const newStatus = this.state.newStatus;
        const data = {
            status: newStatus
        }

        if (!newStatus) {
            alert("Please select a valid status.");
            return;
        }

        axios.put('http://localhost:4500/medicinerequests/edit/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: ""
                })

            }
            alert("Order status changed!");
            this.retrieveMedicineDeliveryRequests();
        })

    }



    filterData(MDR1, MDR2, MDR3, searchPhrase) {
        const results1 = MDR1.filter((mdr) =>
            mdr.name.toLowerCase().includes(searchPhrase.toLowerCase()) || mdr._id.includes(searchPhrase)
        )
        const results2 = MDR2.filter((mdr) =>
            mdr.name.toLowerCase().includes(searchPhrase.toLowerCase()) || mdr._id.includes(searchPhrase)
        )
        const results3 = MDR3.filter((mdr) =>
            mdr.name.toLowerCase().includes(searchPhrase.toLowerCase()) || mdr._id.includes(searchPhrase)
        )
        this.setState({ processingMedicineDeliveryRequests: results1, medicineDeliveryRequests: results2, toBeDoneMDRs: results3 })
    }

    handleSearchSection = (e) => {
        const searchPhrase = e.currentTarget.value

        axios.get("http://localhost:4500/medicinerequests").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingRequests.filter(request => request.status === "Pending" || request.status === "In Review" || request.status === "Approved" || request.status === "In Preparation"), res.data.existingRequests.filter(request => request.status === "Cancelled" || request.status === "Completed"), res.data.existingRequests.filter(request => request.status === "Paid" || request.status === "Delivery in Progress" || request.status === "Payment Required"), searchPhrase)
            }
        });
    }


    render() {
        return (
            <div className=' dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >


                            <center><h1><u>Medicine Requests Statuses</u></h1></center>
                            <br />
                            <div className="container-fluid d-flex align-items-center flex-column">
                                <input className="form-control me-2" style={{ maxWidth: '300px' }} type="search" name='searchQuarry' placeholder="Search (Name/Order ID)" aria-label="Search" onChange={this.handleSearchSection} />
                            </div>
                            <br /><br /><center><h2>New Orders in Progress</h2></center><br />
                            <table className="table table-dark table-hover table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Address</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Cost (Rs.)</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Current Status</th>
                                        <th scope="col">New Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.processingMedicineDeliveryRequests.map((processingMedicineDeliveryRequests, index) => (

                                        <tr key={processingMedicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{processingMedicineDeliveryRequests._id}</td>
                                            <td style={{ minWidth: '200px' }}>{processingMedicineDeliveryRequests.name}</td>
                                            <td>{processingMedicineDeliveryRequests.userID}</td>
                                            <td style={{ minWidth: '175px' }}>{processingMedicineDeliveryRequests.deliveryAddress}</td>
                                            <td style={{ minWidth: '175px', textAlign: 'center' }}>{processingMedicineDeliveryRequests.orderCost}</td>
                                            <td style={{ minWidth: '175px', textAlign: 'center' }} className={`${processingMedicineDeliveryRequests.status === 'Approved'? 'text-success':'text-primary'}`}><b>{processingMedicineDeliveryRequests.status}</b></td>
                                            <td style={{ minWidth: '150px' }}>
                                                <select className="form-select" id="selectStatus" name="newStatus" onChange={this.handleInputChange} required>
                                                    <option></option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Review">In Review</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="In Preparation">In Preparation</option>
                                                </select>
                                            </td>

                                            <td><button type="button" name="billAmount" className="btn btn-light btn-outline-success" onClick={() => this.onUpdate(processingMedicineDeliveryRequests._id, processingMedicineDeliveryRequests)}>UPDATE</button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <br /><br />
                        <hr />
                        <br />
                        <div>
                            <center><h2>Other Medicine Delivery Requests in Processing</h2></center><br />
                            <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Cost (Rs.)</th>
                                        <th scope="col">Prescription Details</th>
                                        <th >Prescription</th>
                                        <th scope="col">Deliverer</th>
                                        <th scope="col"><center>Status</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.toBeDoneMDRs.map((toBeDoneMDRs, index) => (

                                        <tr key={toBeDoneMDRs._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{toBeDoneMDRs._id}</td>
                                            <td style={{ minWidth: '200px' }}>{toBeDoneMDRs.name}</td>
                                            <td>{toBeDoneMDRs.userID}</td>
                                            <td style={{ minWidth: '175px' }}>{toBeDoneMDRs.deliveryAddress}</td>
                                            <td style={{ maxWidth: '175px', textAlign: 'center' }}>{toBeDoneMDRs.orderCost}</td>
                                            <td style={{ minWidth: '175px' }}>{toBeDoneMDRs.prescriptionDetails}</td>
                                            <td style={{ textAlign: 'center' }}>{toBeDoneMDRs.prescriptionFile ?
                                                <a href={toBeDoneMDRs.prescriptionFile} download>Download</a> :
                                                <span></span>
                                            }</td>
                                            <td style={{ minWidth: '175px' }}>{toBeDoneMDRs.deliveryPerson}</td>
                                            <td style={{ minWidth: '150px' }}><center><b>{toBeDoneMDRs.status}</b></center></td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div >

                            <br /><br />
                            <hr />
                            <br />

                            <center><h2>Previously Received Medicine Delivery Requests</h2></center><br />
                            <table className="table table-success table-hover table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Cost (Rs.)</th>
                                        <th scope="col">Prescription Details</th>
                                        <th >Prescription</th>
                                        <th scope="col">Deliverer</th>
                                        <th scope="col"><center>Status</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.medicineDeliveryRequests.map((medicineDeliveryRequests, index) => (

                                        <tr key={medicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{medicineDeliveryRequests._id}</td>
                                            <td style={{ minWidth: '200px' }}>{medicineDeliveryRequests.name}</td>
                                            <td>{medicineDeliveryRequests.userID}</td>
                                            <td style={{ minWidth: '175px' }}>{medicineDeliveryRequests.deliveryAddress}</td>
                                            <td style={{ maxWidth: '175px', textAlign: 'center' }}>{medicineDeliveryRequests.orderCost}</td>
                                            <td style={{ minWidth: '175px' }}>{medicineDeliveryRequests.prescriptionDetails}</td>
                                            <td style={{ textAlign: 'center' }}>{medicineDeliveryRequests.prescriptionFile ?
                                                <a href={medicineDeliveryRequests.prescriptionFile} download>Download</a> :
                                                <span></span>
                                            }</td>
                                            <td style={{ minWidth: '175px' }}>{medicineDeliveryRequests.deliveryPerson}</td>
                                            <td style={{ minWidth: '150px' }} className={`${medicineDeliveryRequests.status === 'Cancelled'||medicineDeliveryRequests.status === 'Rejected' ? 'text-danger':'text-success'}`}><b><center>{medicineDeliveryRequests.status}</center></b></td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>

                        </div><br />
                        <br />
                        <center><button className="btn btn-success" onClick={this.generatePDF}>Download PDF</button></center>

                    </div>
                </div>
            </div>
        )
    }
}
