import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function Headerinventory() {
  const [activeTab, setActiveTab] = useState("");


  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div className='navh'>
      <div id="navid">
      <title>Navigation Bar</title>
      <link rel="stylesheet" type="text/css" href="style.css" />

      <nav>
        <ul>
          <li
            className={activeTab === "Overview" ? "active" : ""}
            onClick={() => handleTabClick("Overview")}
          >
            <Link to="http://localhost:3000/employee">Dashboard</Link>
          </li>
          <li
            className={activeTab === "Scheduler" ? "active" : ""}
            onClick={() => handleTabClick("Scheduler")}
          >
            <Link to="http://localhost:3000/payroll/">Payroll</Link>
          </li>
          <li
            className={activeTab === "Make Appointment" ? "active" : ""}
            onClick={() => handleTabClick("Make Appointment")}
          >
            <Link to="http://localhost:3000/attendance/">Attendance</Link>
          </li>
          <li
            className={activeTab === "Reports" ? "active" : ""}
            onClick={() => handleTabClick("Reports")}
          >
            <Link to="http://localhost:3000/leave/">Leaves</Link>
          </li>
          <li>
            <a href="">Hello, Admin</a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
}

export default Headerinventory;
