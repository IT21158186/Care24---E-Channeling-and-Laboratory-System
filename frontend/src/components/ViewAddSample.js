
import React, { Component } from 'react';
import axios from 'axios';


export default class ViewAddSample extends Component{
    constructor(props) {
        super(props);

        this.state = {
            addsampleRequest: [],
            amptId:"",
            searchResult: {}
            
        };
    }

    componentDidMount() {
        this.retrieveAddSampleRequests();
    }

    retrieveAddSampleRequests() {
        axios.get("http://localhost:4500/newaddsample").then(res => {
            if (res.data.success) {
                const existingNewRequests = res.data.existingRequests;
                this.setState({
                    addsampleRequest: existingNewRequests
                });
                console.log(this.setState.addsampleRequest);
            }
        });
    }

    handleSearch = (e) => {
        e.preventDefault();
        const { amptId } = this.state;
        axios.get(`http://localhost:4500/newresult/${amptId}`)
          .then((res) => {
            if (res.data.success) {
              this.setState({ searchResult: res.data.result });
            } else {
              alert("No results found.");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
 

    onDelete = (id) => {
        axios.delete('http://localhost:4500/newaddsample/remove/' + id).then((res) => {
            alert("Deletion successful.");
            this.retrieveAddSampleRequests();
        })
    }

    render() {
        const { searchResult } = this.state;
        return (

                
            <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >
                        

                            
                            <center><h1>Sample List</h1></center><br /><hr />
                            {/* <form onSubmit={this.handleSearch}>
                                    <div className="mb-3">
                                    
                                    <input type="text" name="searchId" className="form-control" onChange={this.handleInputChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Search</button>
                                </form> */}
                                <br></br>

                            <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', marginLeft: '-75px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Appoinment ID</th>
                                        <th scope="col">Sample ID</th>
                                        <th scope="col">Patient Name</th>
                                        <th scope="col">Patient Address</th>
                                        <th scope="col">Patient Age</th>
                                        <th scope="col">Conatct Number</th>
                                        <th scope="col">Sample Type</th>
                                        <th scope="col">Test Name</th>
                                        
                                        
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.searchResult && this.state.addsampleRequest.map((addsampleRequest, index) => (

                                        <tr key={addsampleRequest._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td><a href={`/addsample/${addsampleRequest._id}`}style={{textDecoration:'none'}} >
                                            {addsampleRequest.amptId}</a></td>
                                            <td>{addsampleRequest.sampleId}</td>
                                            <td>{addsampleRequest.name}</td>
                                            <td>{addsampleRequest.address}</td>
                                            <td>{addsampleRequest.age}</td>
                                             <td>{addsampleRequest.phone}</td>
                                             <td>{addsampleRequest.sampleType}</td>
                                             <td>{addsampleRequest.testName}</td>

                                          
                                            <td><a href={`/addsample/edit/${addsampleRequest._id}`} className="btn btn-warning">
                                            <i class="fa-solid fa-pen-to-square" aria-hidden="true">&nbsp;&nbsp;Update</i>
                                            </a></td>
                                            <td><a href={`/addsample/test/edit/${addsampleRequest._id}`} className="btn btn-warning">
                                            <i class="fa-solid fa-pen-to-square" aria-hidden="true">&nbsp;&nbsp;Add Result</i>
                                            </a></td>
                                            <td><a href={`/addsample/viewdata/${addsampleRequest._id}`} className="btn btn-warning">
                                            <i class="fa-solid fa-pen-to-square" aria-hidden="true">&nbsp;&nbsp;View Result</i>
                                            </a></td>

                                            
                                            <td><button type="button" className="btn btn-danger" onClick={() => this.onDelete(addsampleRequest._id)}><i className="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;Delete</i></button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>




                        <div >

                            <br />
                        </div>



                    </div>
                </div>
            </div>


        )
    }

} 

