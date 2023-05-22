import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

function Header() {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div>
      <title>Navigation Bar</title>
      <link rel="stylesheet" type="text/css" href="/css/MDMHeader.css" />

      <div className="navh">
      <ul>
          <li
            className={activeTab === "Overview" ? "active" : ""}
            onClick={() => handleTabClick("Overview")}
          >
            <a href="/appointments/overview">Overview</a>
          </li>


          <li
            className={activeTab === "Scheduler" ? "active" : ""}
            onClick={() => handleTabClick("Scheduler")}
          >
            <a href="/appointments/scheduler">Scheduler</a>
          </li>


          <li
            className={activeTab === "Make Appointment" ? "active" : ""}
            onClick={() => handleTabClick("Make Appointment")}
          >
            <Link to="/appointments/add" className="a">Make Appointment</Link>
          </li>

          <li
            className={activeTab === "Invoicing" ? "active" : ""}
            onClick={() => handleTabClick("Invoicing")}
          >
            <Link to="/invoices" className="a">Invoicing</Link>
          </li>
         
          <li>
            <a href="">Hello {localStorage.getItem("NAME")} </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;