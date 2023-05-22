import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

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
    <div className="navh">
      <div id="navid">
      <title>Navigation Bar</title>
      <link rel="stylesheet" type="text/css" href="style.css" />

      <nav>
        <ul>
          <li
          
            className={activeTab === "Overview" ? "active" : ""}
            onClick={() => handleTabClick("Overview")}
          >
            <a href="/inventory">View Inventory</a>
          </li>
          <li
            className={activeTab === "Scheduler" ? "active" : ""}
            onClick={() => handleTabClick("Scheduler")}
          >
            <a href="/inventory/add">Reorder</a>
          </li>
          <li
            className={activeTab === "Make Appointment" ? "active" : ""}
            onClick={() => handleTabClick("Make Appointment")}
          >
            <a href="/inventory/all">Order History</a>
          </li>
          <li
            className={activeTab === "Reports" ? "active" : ""}
            onClick={() => handleTabClick("Reports")}
          >
            <a href="/inventory/addispatch">Dispatch Items</a>
          </li>
          <li>
            <a href="">Hello, </a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
}

export default Headerinventory;
