import React, { Component } from 'react'
import axios from 'axios'

export default class AddSampleForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            amptId:"",
            sampleId:"",
            name: "",
            address:"",
            age: "",
            phone: "",
            sampleType:"",
            testName:""
            
            
          }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
    
        this.setState({
          ...this.state,
          [name]: value
        })
      }

      onSubmit = (e) => {
        e.preventDefault();
        const {amptId,sampleId,name, address, age,phone,sampleType,testName} = this.state;
    
        const data = {
          amptId:amptId,
          sampleId:sampleId,
          name: name,
          address:address,
          age: age,
          phone: phone ,
          sampleType:sampleType,
          testName:testName
          
        }
        console.log(data)

        // validate form fields
    if (!amptId||!sampleId||!name||!address||!age||!phone||!sampleType||!testName) {
        alert("Please fill in all required fields.");
        return;
      }
  
  
      axios.post("http://localhost:4500/newaddsample/create", data)
        .then((res) => {
          if (res.data.success) {
            this.setState({
                amptId:"",
                sampleId:"",
                name: "",
                address:"",
                age: "",
                phone: "",
                sampleType:"",
                testName:""
              
            })
            alert("Add new Sample Successful.");
            window.location.replace("http://localhost:3000/addsample/viewaddsample")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }


    render() {
        return (
          <div>
    
    <div className='container dashboard'>
                    <div className='dashboard-app'>
                        <div className='dashboard-content'>
    
                        <div class="container">
      <div class="row">
        <div class="col">
    
            <form>
            <div className="mb-3">
                <label className="form-label">Appoinment ID:</label>
                <input type="text" name="amptId" className="form-control" onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Sample ID:</label>
                <input type="text" name="sampleId" className="form-control" onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Patient Name:</label>
                <input type="text" name="name" className="form-control" onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Patient Address:</label>
                <input type="text" name="address" className="form-control" onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Patient Age:</label>
                <input type="number" name="age" className="form-control" onChange={this.handleInputChange} required />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Conatct Number:</label>
                <input type="text" name="phone" className="form-control" maxlength="10" onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
            <select class="form-select" id="selectSampleType" name="sampleType" onChange={this.handleInputChange} required>
              <option>Sample Type...</option>
              <option value="Blood">Blood</option>
              <option value="Urine">Urine</option>
            </select>
          </div>

          <div className="mb-3">
            <select class="form-select" id="selectTestName" name="testName" onChange={this.handleInputChange} required>
              <option>Test Name...</option>
              <option value="Full Blood Count">Full Blood Count</option>
              <option value="Urine Test">Urine Test</option>
            </select>
          </div>
              
              <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </form>
    
            </div>
            <div class="col">
            
              
              
              
              <center><img src="/images/medicinedeliverymanagementArt.jpg" style={{ maxWidth: '400px', align: 'center' }}/></center>
    
            </div>
            </div>
            </div>
    
    </div></div></div>
    
          </div>
        )
      }
}