// //import axios from 'axios';
// //import React, { useState, useEffect } from 'react';
// //import React, { Component } from 'react';
// //import { useParams } from 'react-router-dom';
// /*
// function AddResults() {
//   const [singleAddResultRequest, setSingleAddResultRequest] = useState(null);
//   const { id } = useParams();

//        useEffect(() => {
//     axios.get(`http://localhost:4500/newaddsample/view/${id}`)
//       .then((res) => {
//         if (res.data.success) {
//           setSingleAddResultRequest(res.data.addsampleRequest);
//         } else {
//           console.log(res.data.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   return (
   
//     <div className='container dashboard'>
//                 <div className='dashboard-app'>
//                 <div className='dashboard-content'>
//                             <div className='container'>
//                     <div className='card'>
//                     <div className='card-body'>

      
//       {singleAddResultRequest ? (
//         <table className="table table-striped table-hover">
//           <thead>
//             <tr>
//               <th>SampleId</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Phone</th>
//               <th>Sample Type</th>
//               <th>Test Name</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{singleAddResultRequest.sampleId}</td>
//               <td>{singleAddResultRequest.name}</td>
//               <td>{singleAddResultRequest.age}</td>
//               <td>{singleAddResultRequest.phone}</td>
//               <td>{singleAddResultRequest.sampleType}</td>
//               <td>{singleAddResultRequest.testName}</td>
              
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// }

// export default AddResults; 
// */

// /*
// import axios from 'axios';
// import React, { Component } from 'react';

// export default class AddResult extends Component{
//   constructor(props){
//     super(props);

//     this.state = {
//       results: [
//         {
//           test: '',
//           result: '',
//           unit: '',
//           refValue: ''
//         }
//       ]
//     }
//   }

//   handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const { results } = this.state;
//     const updatedResults = [...results];
//     updatedResults[index][name] = value;
//     this.setState({
//       results: updatedResults
//     })
//   }

//   onSubmit = (e) => {
//     e.preventDefault();
//     const { results } = this.state;
//     const data = {
//       results: results
//     }
//     console.log(data)

//     // validate form fields
//     for (let i = 0; i < results.length; i++) {
//       const { test, result, unit, refValue } = results[i];
//       if (!test || !result || !unit || !refValue) {
//         alert("Please fill in all required fields.");
//         return;
//       }
//     }

//     axios.post("http://localhost:4500/newresult/create", data)
//     .then((res) => {
//       if (res.data.success) {
//         this.setState({
//           results: [
//             {
//               test: '',
//               result: '',
//               unit: '',
//               refValue: ''
//             }
//           ]
//         })
//         alert("Test Result add Successful.");
//         //window.location.replace("http://localhost:3000/addsample/viewaddsample")
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

//   render(){
//     const { results } = this.state;
//     return(
//       <div className='container dashboard'>
//         <div className='dashboard-app'>
//           <div className='dashboard-content'>
//               <div >

//                <br /><br /><br />

//                   <center><h1>Add Test Result</h1></center><br /><hr />
                  
//               <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', marginLeft: '-75px' }}>
//                       <thead>
//                             <tr>
                              
//                               <th scope="col">Test</th>
//                               <th scope="col">Result</th>
//                               <th scope="col">Unit</th>
//                               <th scope="col">Refernece Value</th>
//                             </tr>
//                       </thead>
//                       <tbody>
//   {results.map((item, index) => (
//     <tr key={index}>
//       <td>
//         <select
//           name="test"
//           value={item.test}
//           onChange={(e) => this.handleInputChange(e, index)}
//         >
//           <option value="totalWhiteCell">Total White Cell Count</option>
//           <option value="neutrophils">Neutrophils</option>
//           <option value="monocytes">Monocytes</option>
//           <option value="haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input
//             type="text"
//             name="result"
//             className="form-control"
//             value={item.result}
//             onChange={(e) => this.handleInputChange(e, index)}
//             required
//           />
//         </div>
//       </td>

//       <td>
//         <select
//           name="unit"
//           value={item.unit}
//           onChange={(e) => this.handleInputChange(e, index)}
//         >
//           <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//         </select>
//       </td>

//       <td>
//         <select
//           name="refValue"
//           value={item.refValue}
//           onChange={(e) => this.handleInputChange(e, index)}
//         >
//           <option value="4%-11%">4%-11%</option>
//           <option value="40-80">40-80</option>
//           <option value="20-50">20-50</option>
//         </select>
//       </td>
//     </tr>
//   ))}
  
// </tbody>

//               </table>
//                   <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
//           </div>
//          </div>
//     </div>
//   </div>
        
//     )
//   }

// } */

// /*
// import React, { Component } from 'react';
// import axios from 'axios';


// export default class AddResult extends Component{
//   constructor(props){
//     super(props);

//     this.state = {
//         test1:"",
//         test2:"",
//         test3: "",
//         result1:"",
//         result2: "",
//         result3: "",
//         unit1:"",
//         unit2:"",
//         unit3:"",
//         refValue1:"",
//         refValue2:"",
//         refValue3:""
        
        
//       }
//     }

//     handleInputChange = (e) => {
//       const { name, value } = e.target;
  
//       this.setState({
//         ...this.state,
//         [name]: value
//       })
//     }

//     onSubmit = (e) => {
//       e.preventDefault();
//       const {test1,test2,test3, result1, result2,result3,unit1,unit2,unit3,refValue1,refValue2,refValue3} = this.state;
  
//       const data = {
//         test1:test1,
//         test2:test2,
//         test3:test3,
//         result1:result1,
//         result2:result2,
//         result3:result3 ,
//         unit1:unit1,
//         unit2:unit2,
//         unit3:unit3,
//         refValue1:refValue1,
//         refValue2:refValue2,
//         refValue3:refValue3,
        
        
//       }
//       console.log(data) 

     


//      axios.post(`http://localhost:4500/newresult/${id}`, data)
//         .then((res) => {
//           if (res.data.success) {
//             this.setState({
//               test1:"",
//               test2:"",
//               test3: "",
//               result1:"",
//               result2: "",
//               result3: "",
//               unit1:"",
//               unit2:"",
//               unit3:"",
//               refValue1:"",
//               refValue2:"",
//               refValue3:""
              
//             })
//             alert("Add new Result Successful.");
//            // window.location.replace("http://localhost:3000/addsample/viewaddsample")
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         }); 
//     } 

   

//     render(){
//       return(
//         <div className='container dashboard'>
//         <div className='dashboard-app'>
//           <div className='dashboard-content'>
//               <div >

               

//                   <center><h1>Add Test Result</h1></center><br /><hr />
                  
//               <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', marginLeft: '50px' }}>
//                       <thead>
//                             <tr>
                              
//                               <th scope="col">Test</th>
//                               <th scope="col">Result</th>
//                               <th scope="col">Unit</th>
//                               <th scope="col">Refernece Value</th>
//                             </tr>
//                       </thead>
//                       <tbody>
  
//     <tr>
//       <td>
//         <select name="test1" onChange={this.handleInputChange}>
//           <option value="totalWhiteCell">Total White Cell Count</option>
//           <option value="neutrophils">Neutrophils</option>
//           <option value="monocytes">Monocytes</option>
//           <option value="haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input type="text"name="result1" className="form-control"  onChange={this.handleInputChange} required/>
//         </div>
//       </td>

//       <td>
//         <select name="unit1" onChange={this.handleInputChange}>
//           <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//         </select>
//       </td>

//       <td>
//         <select name="refValue1"  onChange={this.handleInputChange} >
//           <option value="4%-11%">4%-11%</option>
//           <option value="40-80">40-80</option>
//           <option value="20-50">20-50</option>
//         </select>
//       </td>
//     </tr>

//     <tr>
//       <td>
//         <select name="test2" onChange={this.handleInputChange}>
//           <option value="totalWhiteCell">Total White Cell Count</option>
//           <option value="neutrophils">Neutrophils</option>
//           <option value="monocytes">Monocytes</option>
//           <option value="haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input type="text"name="result2" className="form-control"  onChange={this.handleInputChange} required/>
//         </div>
//       </td>

//       <td>
//         <select name="unit2" onChange={this.handleInputChange}>
//           <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//         </select>
//       </td>

//       <td>
//         <select name="refValue2"  onChange={this.handleInputChange} >
//           <option value="4%-11%">4%-11%</option>
//           <option value="40-80">40-80</option>
//           <option value="20-50">20-50</option>
//         </select>
//       </td>
//     </tr>
        

//     <tr>
//       <td>
//         <select name="test3" onChange={this.handleInputChange}>
//           <option value="totalWhiteCell">Total White Cell Count</option>
//           <option value="neutrophils">Neutrophils</option>
//           <option value="monocytes">Monocytes</option>
//           <option value="haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input type="text"name="result3" className="form-control"  onChange={this.handleInputChange} required/>
//         </div>
//       </td>

//       <td>
//         <select name="unit3" onChange={this.handleInputChange}>
//           <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//         </select>
//       </td>

//       <td>
//         <select name="refValue3"  onChange={this.handleInputChange} >
//           <option value="4%-11%">4%-11%</option>
//           <option value="40-80">40-80</option>
//           <option value="20-50">20-50</option>
//         </select>
//       </td>
//     </tr>
 
 
  
// </tbody>

//               </table>
//                   <button type="submit" className="btn btn-primary" style={{ width: 'auto', align: 'center', marginLeft: '50px' }}onClick={this.onSubmit}>Submit</button>
//           </div>
//          </div>
//     </div>
//   </div>
//       )
//     }
  
    
// } */


// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate,useParams } from 'react-router-dom';
// import Swal from "sweetalert2";

// function Result(){
  
//   const [test1, setTest1] = useState('');
//   const [test2, setTest2] = useState('');
//   const [test3, setTest3] = useState('');
//   const [result1, setResult1] = useState('');
//   const [result2, setResult2] = useState('');
//   const [result3, setResult3] = useState('');
//   const [unit1, setUnit1] = useState('');
//   const [unit2, setUnit2] = useState('');
//   const [unit3, setUnit3] = useState('');
//   const [refValue1, setRefValue1] = useState('');
//   const [refValue2, setRefValue2] = useState('');
//   const [refValue3, setRefValue3] = useState('');
//   const navigate = useNavigate();
  
//   const{id}=useParams();

  

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//    const newResult={
//       test1,
//       test2,
//       test3,
//       result1,
//       result2,
//       result3,
//       unit1,
//       unit2,
//       unit3,
//       refValue1,
//       refValue2,
//       refValue3
//     } 


    
//       axios.post("http://localhost:4500/newresult/create",newResult) 
//           .then((response) => {
//             Swal.fire({
//               icon: "success",
//               title: "Order Success",
//               confirmButtonText: "OK",
//               onConfirm: () => {
//                 setTest1("");
//                 setTest2("");
//                 setTest3("");
//                 setResult1("");
//                 setResult2("");
//                 setResult3("");
//                 setUnit1("");
//                 setUnit2("");
//                 setUnit3("");
//                 setRefValue1("");
//                 setRefValue2("");
//                 setRefValue3("");
//               },
//             }).then(() => navigate(`/addsample/view/${id}`));
//         console.log(response.data.status);
//       });  
//     };
  

//   return(
//     <div className='container dashboard'>
//     <div className='dashboard-app'>
//       <div className='dashboard-content'>
//           <div >
//           <center><h1>Add Test Result</h1></center><br /><hr />

//           <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', marginLeft: '50px' }} >
//                       <thead>
//                             <tr>
                              
//                               <th scope="col">Test</th>
//                               <th scope="col">Result</th>
//                               <th scope="col">Unit</th>
//                               <th scope="col">Refernece Value</th>
//                             </tr>
//                       </thead>
//                       <tbody>
  
//     <tr>
//       <td>
//         <select name="test1"   onChange={(e) => setTest1(e.target.value)}>
//         <option value="Red Blood Cell Count">Red Blood Cell Count</option>
//           <option value="Neutrophils">Neutrophils</option>
//           <option value="Monocytes">Monocytes</option>
//           <option value="Haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input type="text"name="result1"  value={result1} className="form-control"  onChange={(e) => setResult1(e.target.value)} required/>
//         </div>
//       </td>

//       <td>
//         <select name="unit1"  onChange={(e) => setUnit1(e.target.value)}>
//         <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//           <option value="g/dL">g/dL</option>
//           <option value="10^12/L">10^12/L</option>
//         </select>
//       </td>

//       <td>
//         <select name="refValue1"   onChange={(e) => setRefValue1(e.target.value)} >
//           <option value="4-11">4-11</option>
//           <option value="40%-80%">40%-80%</option>
//           <option value="20%-50%">20%-50%</option>
//           <option value="13.0-17.0">13.0-17.0</option>
//         </select>
//       </td>
//     </tr>


//     <tr>
//       <td>
//         <select name="test2"   onChange={(e) => setTest2(e.target.value)}>
//           <option value="Red Blood Cell Count">Red Blood Cell Count</option>
//           <option value="Neutrophils">Neutrophils</option>
//           <option value="Monocytes">Monocytes</option>
//           <option value="Haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input type="text"name="result2"  value={result2} className="form-control"  onChange={(e) => setResult2(e.target.value)} required/>
//         </div>
//       </td>

//       <td>
//         <select name="unit2"  onChange={(e) => setUnit2(e.target.value)}>
//           <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//           <option value="g/dL">g/dL</option>
//           <option value="10^12/L">10^12/L</option>
//         </select>
//       </td>

//       <td>
//         <select name="refValue2"   onChange={(e) => setRefValue2(e.target.value)} >
//         <option value="4-11">4-11</option>
//           <option value="40%-80%">40%-80%</option>
//           <option value="20%-50%">20%-50%</option>
//           <option value="13.0-17.0">13.0-17.0</option>
//         </select>
//       </td>
//     </tr>

//     <tr>
//       <td>
//         <select name="test3"   onChange={(e) => setTest3(e.target.value)}>
//         <option value="Red Blood Cell Count">Red Blood Cell Count</option>
//           <option value="Neutrophils">Neutrophils</option>
//           <option value="Monocytes">Monocytes</option>
//           <option value="Haemoglobin">Haemoglobin</option>
//         </select>
//       </td>

//       <td>
//         <div className="mb-3">
//           <input type="text"name="result3"  value={result3} className="form-control"  onChange={(e) => setResult3(e.target.value)} required/>
//         </div>
//       </td>

//       <td>
//         <select name="unit3"  onChange={(e) => setUnit3(e.target.value)}>
//           <option value="mg/dL">mg/dL</option>
//           <option value="mmol/L">mmol/L</option>
//           <option value="g/dL">g/dL</option>
//           <option value="10^12/L">10^12/L</option>
//         </select>
//       </td>

//       <td>
//         <select name="refValue3"   onChange={(e) => setRefValue3(e.target.value)} >
//         <option value="4-11">4-11</option>
//           <option value="40%-80%">40%-80%</option>
//           <option value="20%-50%">20%-50%</option>
//           <option value="13.0-17.0">13.0-17.0</option>
//         </select>
//       </td>
//     </tr>
//       </tbody>
//     </table>
//     <button type="submit" className="btn btn-primary" style={{ width: 'auto', align: 'center', marginLeft: '50px' }} onClick={handleSubmit}>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//   )

// }


// export default Result;




