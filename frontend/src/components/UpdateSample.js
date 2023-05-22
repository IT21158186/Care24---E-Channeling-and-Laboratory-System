/*
import React, { Component } from 'react'
import axios from 'axios';
import { useParams } from "react-router";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}



 class UpdateSample extends Component{
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
       const id = this.props.match?.params?.id;
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
    if (!amptId||!sampleId||!name||!address||!age||!phone) {
        alert("Please fill in all required fields.");
        return;
      
      
  
      axios.put(`http://localhost:4500/newaddsample/edit/${id}`,data)
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
            alert("Sample Update Successful.");
            window.location.replace("http://localhost:3000/addsample/viewaddsample")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

   componentDidMount(){
    this.retrieveAddSampleRequests();
    
   }
   retrieveAddSampleRequests(){
    const id = this.props.match?.params?.id;
         axios.get(`http://localhost:4500/newaddsample/${id}`).then((res) => {
            if (res.data.success) {
              const existingNewRequests = res.data.existingRequests;
                this.setState({
                    //addsampleRequset:res.data.addsampleRequset
                    addsampleRequest: existingNewRequests
                   amptId: res.data.addsampleRequest.amptId,
                    sampleId: res.data.addsampleRequest.sampleId,
                    name: res.data.addsampleRequest.name,
                    address: res.data.addsampleRequest.address,
                    age: res.data.addsampleRequest.age,
                    phone: res.data.addsampleRequest.phone,
                    sampleType: res.data.addsampleRequest.sampleType,
                    testName: res.data.addsampleRequest.testName, 
                });
                console.log(this.state.addsampleRequset)
            }
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
                <input type="text" name="amptId" className="form-control" value={this.state.amptId} onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Sample ID:</label>
                <input type="text" name="sampleId" className="form-control" value={this.state.sampleId} onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Address:</label>
                <input type="text" name="address" className="form-control" value={this.state.address} onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Age:</label>
                <input type="number" name="age" className="form-control" value={this.state.age} onChange={this.handleInputChange} required />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input type="text" name="phone" className="form-control" maxlength="10" value={this.state.phone} onChange={this.handleInputChange} required />
              </div>

              <div className="mb-3">
            <select class="form-select" id="selectSampleType" name="sampleType" value={this.state.sampleType} onChange={this.handleInputChange} required>
              <option>Sample Type...</option>
              <option value="Blood">Blood</option>
              <option value="Urine">Urine</option>
            </select>
          </div>

          <div className="mb-3">
            <select class="form-select" id="selectTestName" name="testName" value={this.state.testName} onChange={this.handleInputChange} required>
              <option>Test Name...</option>
              <option value="Full Blood Count">Full Blood Count</option>
              <option value="Urine Test">Urine Test</option>
            </select>
          </div>
              
              <button type="submit" className="btn btn-primary" onClick={this.onSubmit(this.state.id)}>Submit</button>
            </form>
    
            </div>
            <div class="col">
            
              
              
              
              
    
            </div>
            </div>
            </div>
    
    </div></div></div>
    
          </div>
        )
      }
       
} 

export default withParams(UpdateSample); 
*/





/*
import {Link,useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

function UpdatedSample(){
  const {id} = useParams();

  const [amptId,setAmptId]=useState("");
  const [sampleId,setSampleId]=useState("");
  const [name,setName]=useState("");
  const [address, setAddress]=useState("");
  const [age,setAge]=useState("");
  const [phone,setPhone]=useState("");
  const [sampleType,setSampleType]=useState("");
  const [testName,setTestName]=useState("");

  function sendSampleData(e){
    e.preventDefault();
    alert("Going to Update Program")
    }   

    const newSample = {
      amptId,
      sampleId,
      name,
      address,
      age,
      phone,
      sampleType,
      testName
  }

axios.put(`http://localhost:4500/newaddsample/edit/${id}`,newSample).then(()=>{
  
    }).catch((err)=>{
      alert(err)
      console.log(err);
     
    })

    swal({
      title: "Program is Successfully Updated.",
      icon: "success",
      confirmButtonText: "OK",
        }).then(function () {
            // Redirect the user
            window.location.href = "/GuidanceAdmin";
          });

          useEffect(() => {
            axios.get(`http://localhost:4500/newaddsample/view/${id}`).then(res => {
                setAmptId(res.data.amptId);
                setSampleId(res.data.sampleId);
                setName(res.data.name);
                setAddress(res.data.address);
                setAge(res.data.age);
                setPhone(res.data.phone);
                setSampleType(res.data.sampleType);
                setTestName(res.data.testName);

                console.log(res.data);
                })		
            }, []) 

            return(
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
                          <input type="text" name="amptId" className="form-control" value={amptId} required onChange={(e)=>{
                            setAmptId(e.target.value)
                          }}/>
                        </div>
          
                        <div className="mb-3">
                          <label className="form-label">Sample ID:</label>
                          <input type="text" name="sampleId" className="form-control" value={sampleId} required onChange={(e)=>{
                           setSampleId(e.target.value)
                          }}/>
                        </div>
          
                        <div className="mb-3">
                          <label className="form-label">Name:</label>
                          <input type="text" name="name" className="form-control" value={name}  required onChange={(e)=>{
                             setName(e.target.value)
                            }}/>
                        </div>
          
                        <div className="mb-3">
                          <label className="form-label">Address:</label>
                          <input type="text" name="address" className="form-control" value={address}  required onChange={(e)=>{
                             setAddress(e.target.value)
                            }}/>
                        </div>
          
                        <div className="mb-3">
                          <label className="form-label">Age:</label>
                          <input type="number" name="age" className="form-control" value={age} required  onChange={(e)=>{
                             setAge(e.target.value)
                            }}/>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Phone:</label>
                          <input type="text" name="phone" className="form-control" maxlength="10" value={phone}  required  onChange={(e)=>{
                              setPhone(e.target.value)
                            }}/>
                        </div>
          
                        <div className="mb-3">
                      <select class="form-select" id="selectSampleType" name="sampleType" value={sampleType}  required onChange={(e)=>{
                          setSampleType(e.target.value)
                        }}>
                        <option>Sample Type...</option>
                        <option value="Blood">Blood</option>
                        <option value="Urine">Urine</option>
                      </select>
                    </div>
          
                    <div className="mb-3">
                      <select class="form-select" id="selectTestName" name="testName" value={testName}  required  onChange={(e)=>{
                         setTestName(e.target.value)
                        }}>
                        <option>Test Name...</option>
                        <option value="Full Blood Count">Full Blood Count</option>
                        <option value="Urine Test">Urine Test</option>
                      </select>
                    </div>
                        
                        <button type="submit" className="btn btn-primary" onClick={sendSampleData}>Submit</button>
                      </form>
              
                      </div>
                      <div class="col">
                      
                        
                        
                        
                        
              
                      </div>
                      </div>
                      </div>
              
              </div></div></div>
              
                    </div>

            )

}
export default UpdatedSample;

*/


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AddResults() {
  const [singleAddResultRequest, setSingleAddResultRequest] = useState(null);
  const { id } = useParams();

 

  useEffect(() => {
    axios.get(`http://localhost:4500/newaddsample/view/${id}`)
      .then((res) => {
        if (res.data.success) {
          setSingleAddResultRequest(res.data.addsampleRequest);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4500/newaddsample/edit/${id}`, singleAddResultRequest)
      .then((res) => {
        console.log(res.data.message);
        alert("Add new Sample Successful.");
        window.location.replace("http://localhost:3000/addsample/viewaddsample")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleAddResultRequest(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            
          <center><h1>Update Sample Details</h1></center><br /><hr />
                {singleAddResultRequest ? (
                  <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="sampleId" className="form-label">Sample Id</label>
                    <input type="text" className="form-control" id="sampleId" name="sampleId" value={singleAddResultRequest.sampleId} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={singleAddResultRequest.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" name="age" value={singleAddResultRequest.age} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={singleAddResultRequest.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sampleType" className="form-label">Sample Type</label>
                    <select className="form-select" id="sampleType" name="sampleType" value={singleAddResultRequest.sampleType} onChange={handleChange}>
                      <option value="Blood">Blood</option>
                      <option value="Urine">Urine</option>
                      
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="testName" className="form-label">Test Name</label>
                    <select className="form-select" id="sampleType" name="testName" value={singleAddResultRequest.testName} onChange={handleChange}>
                      <option value="Full Blood Count">Full Blood Count</option>
                      <option value="Urine Test">Urine Test</option>
                      
                    </select>
                  </div>


                    <button type='submit' className='btn btn-primary'>
                      Submit</button>
                  </form>
                ) : (
                  <p>Loading...</p>
                )}
              
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddResults;

