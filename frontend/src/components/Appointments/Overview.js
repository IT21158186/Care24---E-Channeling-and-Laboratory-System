import React, { useState, useEffect } from "react";
import axios from "axios";

import './CSS/Overview.css'

export default function Overview() {
  const [newApmts, setNewApmts] = useState([]);
  const [newLabApmts, setNewLabApmts] = useState([]);
  const [docApmtCount, setDocApmtCount] = useState(0);
  const [newLabApmtsCount, setNewLabApmtsCount] = useState(0);

  useEffect(() => {
    getApmts();
    getLabApmts();
  }, []);

  // Doc Apmt Read function
  function getApmts() {
    axios
      .get("http://localhost:4500/newApmt/")
      .then((res) => {
        setNewApmts(res.data);
        setDocApmtCount(res.data.length);
      })
      .catch((err) => {
        console.error(err);
        alert("Error retrieving doctor appointments");
      });
  }

  // Lab Apmt Read function
  function getLabApmts() {
    axios
      .get("http://localhost:4500/newLabApmt/labAll")
      .then((res) => {
        setNewLabApmts(res.data);
        setNewLabApmtsCount(res.data.length);
      })
      .catch((err) => {
        console.error(err);
        alert("Error retrieving lab appointments");
      });
  }

  return (
    <div className="form-container1">
      <h1>Overview</h1>
      
      <div className="overview-container">

      <div className="appointment-count-box">
          <h4>Total Pending Appointments</h4>
          <div className="count">{docApmtCount+newLabApmtsCount}</div>
        </div>
        
        <div className="appointment-count-box">
          <h4>Doctor Appointments Count</h4>
          <div className="count">{docApmtCount}</div>
        </div>

        <div className="appointment-count-box">
          <h4>Lab Appointments Count</h4>
          <div className="count">{newLabApmtsCount}</div>
        </div>

      </div>
    </div>
  );
}