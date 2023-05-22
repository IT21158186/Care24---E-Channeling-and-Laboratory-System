import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';

import 'jspdf-autotable';


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




  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("View Test Result", 105, 20, { align: "center" });

    const rows = [
      ["Test", "Result", "Unit", "Ref.val"],
      [singleAddResultRequest.test1, singleAddResultRequest.result1, singleAddResultRequest.unit1, singleAddResultRequest.refValue1],
      [singleAddResultRequest.test2, singleAddResultRequest.result2, singleAddResultRequest.unit2, singleAddResultRequest.refValue2],
      [singleAddResultRequest.test3, singleAddResultRequest.result3, singleAddResultRequest.unit3, singleAddResultRequest.refValue3]
    ];

    doc.autoTable({
      startY: 30,
      head: rows.slice(0, 1),
      body: rows.slice(1),
    });

    doc.save("test_result.pdf");
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <center>
              <h1>View Test Result</h1>
            </center>
            <br />
            <hr />
            {singleAddResultRequest ? (
              <form >
                <table>
                  <thead>
                    <tr>
                      <td>Test</td>
                      <td>Result</td>
                      <td>Unit</td>
                      <td>Ref.val</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="test1" name="test1" value={singleAddResultRequest.test1}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="result1" name="result1" value={singleAddResultRequest.result1}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="unit1" name="unit1" value={singleAddResultRequest.unit1}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="refValue1" name="refValue1" value={singleAddResultRequest.refValue1}  readOnly />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="test2" name="test2" value={singleAddResultRequest.test2}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="result2" name="result2" value={singleAddResultRequest.result2}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="unit2" name="unit2" value={singleAddResultRequest.unit2}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="refValue2" name="refValue2" value={singleAddResultRequest.refValue2}  readOnly />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="test3" name="test3" value={singleAddResultRequest.test3}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="result3" name="result3" value={singleAddResultRequest.result3}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="unit3" name="unit3" value={singleAddResultRequest.unit3}  readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="refValue3" name="refValue3" value={singleAddResultRequest.refValue3}  readOnly />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={generatePDF}>Print as PDF</button>
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
