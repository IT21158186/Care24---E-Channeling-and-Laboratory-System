import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';


function Result(){
    const[allinventory]=useState([]);
    const [singleAddResultRequest, setSingleAddResultRequest] = useState(null);
    const { id } = useParams();

    useEffect(() => {
      axios.get(`http://localhost:4500/newresult/view/${id}`)
        .then((res) => {
          if (res.data.success) {
            setSingleAddResultRequest(res.data.resultRequest);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);

    function generateReport() {
      const doc = new jsPDF();
      doc.text("Test Result", 10, 10);
      const headers = [['Test', 'Result', 'Unit', 'Refernce Value']];
      const data = allinventory.map(({ test1,test2,test3,result1,result2,result3,unit1,unit2,unit3 ,refValue1,refValue2,refValue3}) => [ test1,test2,test3,result1,result2,result3,unit1,unit2,unit3 ,refValue1,refValue2,refValue3]);
      doc.autoTable({ head: headers, body: data });
      doc.save('inventory_report.pdf');
  }
  
      return(
        <div className='container dashboard'>
        <div className='dashboard-app'>
            <div className='dashboard-content'>
                <div >
                  <center><h1>Test Result</h1></center><br /><hr />
                {singleAddResultRequest ? (
                        <table className="table table-hover table-bordered" style={{ width: 'auto', align: 'center', marginLeft: '170px' }}>
                        <thead>
                            <tr key={singleAddResultRequest._id}>
                                
                                <th scope="col">Test</th>
                                <th scope="col">Result</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Refernece Value</th>
                              </tr>
                              </thead>
                                <tbody>
                                    <tr>
                                   
                                    <td>{singleAddResultRequest.test1}</td>
                                    <td>{singleAddResultRequest.result1}</td>
                                    <td>{singleAddResultRequest.unit1}</td>
                                    <td>{singleAddResultRequest.refValue1}</td>
                                  </tr>
                                  <tr>
                                    <td>{singleAddResultRequest.test2}</td>
                                    <td>{singleAddResultRequest.result2}</td>
                                    <td>{singleAddResultRequest.unit2}</td>
                                    <td>{singleAddResultRequest.refValue2}</td>
                                  </tr>
                                  <tr>
                                   <td>{singleAddResultRequest.test3}</td>
                                   <td>{singleAddResultRequest.result3}</td>
                                    <td>{singleAddResultRequest.unit3}</td>
                                    <td>{singleAddResultRequest.refValue3}</td>
                                        
                                
                                
                                    </tr>
                                    </tbody>
                                    <button type="button" className="btn btn-primary" onClick={generateReport}>Generate Report</button>
                        </table>
                        
                        
                        ) : (
                            <p>Loading...</p>
                      )} 
                 </div>
                </div>
            </div>
        </div>
      );
    

}

export default Result;