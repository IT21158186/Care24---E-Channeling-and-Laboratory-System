import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import logo from '../../components/images/logo.png';

import './CSS/Scheduler.css'

export default function Scheduler() {
  const [newApmts, setnewApmts] = useState([]);
  const [newLabApmts, setnewLabApmts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchInput2, setSearchInput2] = useState("");

  useEffect(() => {
    getApmts();
  }, []);
  useEffect(() => {
    getLabApmts();
  }, []);


  //Doc Apmt Read function
  function getApmts() {
    axios
      .get("http://localhost:4500/newApmt/")
      .then((res) => {
        setnewApmts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }


  //Lab Apmt Read function
  function getLabApmts() {
    axios
      .get("http://localhost:4500/newLabApmt/labAll")
      .then((res) => {
        setnewLabApmts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }


  //Doc Apmt Delete function
  function deletenewApmts(item) {
    axios
      .delete("http://localhost:4500/newApmt/delete/" + item._id)
      .then(() => {
        setnewApmts(newApmts.filter((i) => i._id !== item._id));
        alert("Deleted Successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  }


    //Lab Apmt Delete function
    function deletenewLabApmts(item) {
      axios
        .delete("http://localhost:4500/newLabApmt/lab_delete/" + item._id)
        .then(() => {
          setnewLabApmts(newLabApmts.filter((i) => i._id !== item._id));
          alert("Deleted Successfully");
        })
        .catch((err) => {
          alert(err.message);
        });
    }




  //Doc Apmt Search function
  function searchTable(newApmts) {
    return newApmts.filter((i) => {
      return (
        i.patientName.toLowerCase().includes(searchInput.toLowerCase()) ||
        i.doctor.toLowerCase().includes(searchInput.toLowerCase()) ||
        i.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        i.patientId.toLowerCase().includes(searchInput.toLowerCase())
      );
    })
    
  }



    //Lab Apmt Search function
    function searchTable2(newLabApmts) {
      return newLabApmts.filter((i) => {
        return (
          i.patientName.toLowerCase().includes(searchInput2.toLowerCase()) ||
          i.testType.toLowerCase().includes(searchInput2.toLowerCase()) ||
          i.email.toLowerCase().includes(searchInput2.toLowerCase()) ||
          i.patientId.toLowerCase().includes(searchInput2.toLowerCase())
        );
      });
    }


    //Generate pdf report for all scheduled Doctor Appointments
    function generateDocPDF() {
      const specialElementHandlers = {
        '.no-export': function (element, renderer) {
          return true;
        }
      };
      const doc = new jsPDF('p', 'pt', 'a3');
    
      doc.text(420, 40, 'Doctor Appointments Scheduler Current Report', 'center');
  
      // Add the logo
      const imgData = logo;
      doc.addImage(imgData, 'png', 20, 10, 80, 30);
    
      const head = [['Patient ID', 'Patient Name', 'Contact Number',
        'Age', 'Doctor', 'Date', 'Time', 'E-mail']];
    
      const elements = newApmts.map(newApmt => [
        newApmt.patientId, newApmt.patientName, newApmt.contactNumber,
        newApmt.age, newApmt.doctor, newApmt.date, newApmt.time, newApmt.email
      ]);
    
      autoTable(doc, {
        head: head,
        body: elements,
      });
    
      doc.save("Doctor_Appointments_Report.pdf");
    }



    //Generate pdf report for all scheduled Lab Appointments
    function generateLabPDF() {
      const specialElementHandlers = {
        '.no-export': function (element, renderer) {
          return true;
        }
      };
      const doc = new jsPDF('p', 'pt', 'a3');
    
      doc.text(420, 40, 'Lab Appointments Scheduler Current Report', 'center');
  
      // Add the logo
      const imgData = logo;
      doc.addImage(imgData, 'png', 20, 10, 80, 30);
    
      const head = [['Patient ID', 'Patient Name', 'Contact Number',
        'Age', 'TestType', 'Date', 'Time', 'E-mail']];
    
      const elements = newLabApmts.map(newLabApmts => [
        newLabApmts.patientId, newLabApmts.patientName, newLabApmts.contactNumber,
        newLabApmts.age, newLabApmts.testType, newLabApmts.date, newLabApmts.time, newLabApmts.email
      ]);
    
      autoTable(doc, {
        head: head,
        body: elements,
      });
    
      doc.save("Lab_Appointments_Report.pdf");
    }



  return (

    //Retreve Doc Appointment in Scheduler Top Table
    <body>
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Doctor Appointments Scheduler</h3>
                <div class="col-auto">
                  <div class="input-group mb-2">
                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search" value={searchInput} Search
                      onChange={(e) => setSearchInput(e.target.value)} />
                  </div>
                  <button type="button" className="btn btn-info" onClick={(() => generateDocPDF())}>Generate Report</button>
                </div>
              </div>

              <table className="table-striped">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Contact Number</th>
                    <th>Age</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTable(newApmts).map((i, index) => {
                    return (
                      <tr key={index}>
                        <td>{i.patientId}</td>
                        <td>{i.patientName}</td>
                        <td>{i.contactNumber}</td>
                        <td>{i.age}</td>
                        <td>{i.doctor}</td>
                        <td>{i.date}</td>
                        <td>{i.time}</td>
                        <td>{i.email}</td>
                        <td><Link to={`/appointments/update/${i._id}`}><button type="button" className="btn btn-outline-success btn-sm" >Update</button></Link></td>
                        <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={(() => deletenewApmts(i))}>Cancel</button></td>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </section>
    
      {/*Retreve Lab Appointment in Scheduler Top Table*/}
              <section id="content">
                <main>
                  <div className="table-data">
                    <div className="order">
                      <div className="head">
                        <h3>Lab Appointments Scheduler</h3>
                        <div class="col-auto">
                          <div class="input-group mb-2">
                            <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search" value={searchInput2} Search
                              onChange={(e) => setSearchInput2(e.target.value)} />
                          </div>
                          <button type="button" className="btn btn-info" onClick={(() => generateLabPDF())}>Generate Report</button>
                        </div>
                      </div>

                      <table className="table-striped">
                        <thead>
                          <tr>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                            <th>Contact Number</th>
                            <th>Age</th>
                            <th>Test Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>E-mail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchTable2(newLabApmts).map((i, index) => {
                            return (
                              <tr key={index}>
                                <td>{i.patientId}</td>
                                <td>{i.patientName}</td>
                                <td>{i.contactNumber}</td>
                                <td>{i.age}</td>
                                <td>{i.testType}</td>
                                <td>{i.date}</td>
                                <td>{i.time}</td>
                                <td>{i.email}</td>
                                <td><Link to={`/appointments/labupdate/${i._id}`}><button type="button" className="btn btn-outline-success btn-sm" >Update</button></Link></td>
                                <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={(() => deletenewLabApmts(i))}>Cancel</button></td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  

            </main>
        </section>
    </body>

  )
}