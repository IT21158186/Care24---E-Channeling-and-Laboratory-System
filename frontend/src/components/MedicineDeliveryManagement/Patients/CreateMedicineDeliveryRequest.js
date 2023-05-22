
import React, { Component } from 'react'
import axios from 'axios'
//import NumbersOnlyIN from '../NumbersOnlyInput';

export default class CreateMedicineDeliveryRequest extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userID: localStorage.getItem("USERID"),
      name: "",
      age: "",
      gender: "",
      deliveryAddress: "",
      deliveryCity: "",
      phone: "",
      prescriptionDetails: "",
      prescriptionFile: "",
      today: new Date()
    }
  }


  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleFileUpload = async (e) => {
    const file = e.target.files[0];

    // Check if the file type is allowed
    //if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) { 
    //if (!file.type.startsWith('image/') && !file.type.startsWith('application/pdf')) {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert('Only JPG, PNG, and PDF files are allowed.');
      e.target.value = null; // Clear the input field
      return;
    }


    // Check if the file size is within the limit (2 MB)
    const fileSizeLimit = 2048 * 2048; // 2 MB in bytes
    if (file.size > fileSizeLimit) {
      alert('File size must be less than 2 MB.');
      e.target.value = null; // Clear the input field
      return;
    }

    //console.log(file)
    const base64 = await convertToBase64(file)
    this.setState({ prescriptionFile: base64 });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { userID, name, age, gender, phone, deliveryAddress, city, prescriptionDetails, prescriptionFile, today } = this.state;

    const data = {
      userID: userID,
      name: name,
      age: age,
      gender: gender,
      phone: phone,
      deliveryAddress: deliveryAddress,
      deliveryCity: city,
      prescriptionDetails: prescriptionDetails,
      prescriptionFile: prescriptionFile,
      orderDate: today
    }
    console.log(data)

    // validate form fields
    if (!name || !phone || !deliveryAddress || (!prescriptionDetails && !prescriptionFile) || !gender || !age || !city) {
      alert("Please fill in all required fields.");
      return;
    }


    axios.post("http://localhost:4500/newmedicinerequest/create", data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            name: "",
            age: "",
            gender: "",
            deliveryAddress: "",
            deliveryCity: "",
            phone: "",
            prescriptionDetails: "",
            prescriptionFile: ""
          })
          alert("Medicine Delivery Request Successful.");
          window.location.replace("http://localhost:3000/medicinerequests/view")
        }
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });
  }




  render() {
    return (
      <div>

        <div className='dashboard'>
          <div className='dashboard-app'>
            <div className='dashboard-content'>

              <center><u><h2>Welcome to the Online Medicine Delivery Service Portal!</h2></u></center>
              <br /><br />

              <div className="container">
                <div className="row">
                  <div className="col">

                    <form encType='multipart/form-data'>
                      <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" name="name" className="form-control" defaultValue={localStorage.getItem("NAME")} onChange={this.handleInputChange} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Age:</label>
                        <input type="number" name="age" min="16" max="100" maxLength="3" className="form-control" onChange={this.handleInputChange} required />
                      </div>
                      <label className="form-label">Gender:&nbsp;&nbsp;</label>
                      <div className="mb-3 form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Male" onChange={this.handleInputChange} required />
                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                      </div>
                      <div className="mb-3 form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Female" onChange={this.handleInputChange} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Delivery Address:</label>
                        <input type="text" name="deliveryAddress" className="form-control" onChange={this.handleInputChange} required />
                      </div>
                      <div className="mb-3">
                        <select className="form-select" id="selectCity" name="city" onChange={this.handleInputChange} required>
                          <option>select your city...</option>
                          <option value="Malabe">Malabe</option>
                          <option value="Kaduwela">Kaduwela</option>
                          <option value="Athurugiriya">Athurugiriya</option>
                          <option value="Kollupitiya">Kollupitiya</option>
                          <option value="Battaramulla">Battaramulla</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone:</label>
                        <input type="tel" name="phone" className="form-control" maxLength="10" pattern="[0-9]{10}" onChange={this.handleInputChange} required />
                        {/* <NumbersOnlyIN name="phone"/> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Prescription Details:</label>
                        <textarea name="prescriptionDetails" className="form-control" onChange={this.handleInputChange} required></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Prescription File:</label>
                        <input type="file" name="prescriptionFile" className="form-control" accept='image/*, .pdf' onChange={(e) => this.handleFileUpload(e)} />
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" name='checkAgree' className="form-check-input" id="exampleCheck1" checked disabled required />
                        <label className="form-check-label" htmlFor="exampleCheck1">"I agree to <a href='#'>Privacy Policy</a>, and <a href='#'>Terms & Conditions</a> of 'Care-24'."</label>
                      </div>
                      <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                    </form>

                  </div>
                  <div className="col">

                    <div><br /><br />
                      <h5 style={{ color: 'green' }}>Get your medications delivered right to your doorstep hassle-free with our easy-to-use Medicine Delivery Service.</h5><br />
                      <h5 style={{ color: 'green' }}>Place your order now and experience the convenience!</h5>
                    </div>
                    <br /><br />
                    <center>
                      <div>
                        <h4><i>Once your request is submitted, it will be reviewed by our qualified staff.</i></h4>
                      </div></center>
                    <br /><br /><br />
                    <center><img src="/images/medicinedeliverymanagementArt.jpg" style={{ maxWidth: '400px', align: 'center' }} /></center>

                  </div>
                </div>
              </div>
              <br /><br /><center><img src="/images/Care24_Logo.png" style={{ maxWidth: '300px', align: 'center' }} /></center><br />
            </div></div></div>

      </div>
    )
  }
}


function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}