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

                        <center><h1>Add Test Results</h1></center><br /><hr />
                        {singleAddResultRequest ? (
                            <form onSubmit={handleUpdate}>

                                <table>
                                    <tr>
                                        <td>Test</td>
                                        <td>Result</td>
                                        <td>Unit</td>
                                        <td>Ref.val</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="mb-3">
                                                <select class="form-select" id="test1" name="test1" value={singleAddResultRequest.test1} onChange={handleChange} required>
                                                <option value="Red Blood Cell Count">Red Blood Cell Count</option>
                                                        <option value="Neutrophils">Neutrophils</option>
                                                        <option value="Monocytes">Monocytes</option>
                                                        <option value="Haemoglobin">Haemoglobin</option>
                                                        </select>
                                                {/* <input type="text" className="form-control" id="test1" name="test1" value={singleAddResultRequest.test1} onChange={handleChange} /> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                            <input type="text" className="form-control" id="result1" name="result1" value={singleAddResultRequest.result1} onChange={handleChange} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                                <select class="form-select" id="unit1" name="unit1" value={singleAddResultRequest.unit1} onChange={handleChange} required>
                                                <option value="mg/dL">mg/dL</option>
                                                    <option value="mmol/L">mmol/L</option>
                                                    <option value="g/dL">g/dL</option>
                                                    <option value="10^12/L">10^12/L</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                                <select class="form-select" id="refValue1" name="refValue1" value={singleAddResultRequest.refValue1} onChange={handleChange} required>
                                                <option value="4-11">4-11</option>
                                                <option value="40%-80%">40%-80%</option>
                                                <option value="20%-50%">20%-50%</option>
                                                <option value="13.0-17.0">13.0-17.0</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <div className="mb-3">
                                                <select class="form-select" id="test2" name="test2" value={singleAddResultRequest.test2} onChange={handleChange} required>
                                                <option value="Red Blood Cell Count">Red Blood Cell Count</option>
                                                        <option value="Neutrophils">Neutrophils</option>
                                                        <option value="Monocytes">Monocytes</option>
                                                        <option value="Haemoglobin">Haemoglobin</option>
                                                        </select>
                                                {/* <input type="text" className="form-control" id="test1" name="test1" value={singleAddResultRequest.test1} onChange={handleChange} /> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                            <input type="text" className="form-control" id="result2" name="result2" value={singleAddResultRequest.result2} onChange={handleChange} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                                <select class="form-select" id="unit2" name="unit2" value={singleAddResultRequest.unit2} onChange={handleChange} required>
                                                <option value="mg/dL">mg/dL</option>
                                                    <option value="mmol/L">mmol/L</option>
                                                    <option value="g/dL">g/dL</option>
                                                    <option value="10^12/L">10^12/L</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                                <select class="form-select" id="refValue2" name="refValue2" value={singleAddResultRequest.refValue2} onChange={handleChange} required>
                                                <option value="4-11">4-11</option>
                                                <option value="40%-80%">40%-80%</option>
                                                <option value="20%-50%">20%-50%</option>
                                                <option value="13.0-17.0">13.0-17.0</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>

                            <tr>
                                        <td>
                                            <div className="mb-3">
                                                <select class="form-select" id="test3" name="test3" value={singleAddResultRequest.test3} onChange={handleChange} required>
                                                <option value="Red Blood Cell Count">Red Blood Cell Count</option>
                                                        <option value="Neutrophils">Neutrophils</option>
                                                        <option value="Monocytes">Monocytes</option>
                                                        <option value="Haemoglobin">Haemoglobin</option>
                                                        </select>
                                                {/* <input type="text" className="form-control" id="test1" name="test1" value={singleAddResultRequest.test1} onChange={handleChange} /> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                            <input type="text" className="form-control" id="result3" name="result3" value={singleAddResultRequest.result3} onChange={handleChange} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                                <select class="form-select" id="unit3" name="unit3" value={singleAddResultRequest.unit3} onChange={handleChange} required>
                                                <option value="mg/dL">mg/dL</option>
                                                    <option value="mmol/L">mmol/L</option>
                                                    <option value="g/dL">g/dL</option>
                                                    <option value="10^12/L">10^12/L</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mb-3">

                                                <select class="form-select" id="refValue3" name="refValue3" value={singleAddResultRequest.refValue3} onChange={handleChange} required>
                                                <option value="4-11">4-11</option>
                                                <option value="40%-80%">40%-80%</option>
                                                <option value="20%-50%">20%-50%</option>
                                                <option value="13.0-17.0">13.0-17.0</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                </table>




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