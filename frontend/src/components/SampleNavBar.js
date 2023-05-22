import {Link} from 'react-router-dom';

import React, { useState } from "react";


function Headerinventory() {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div>
      <div id="navid" className="navh">
      <title>Navigation Bar</title>
      <link rel="stylesheet" type="text/css" href="style.css" />

      <nav>
        <ul>
          <li
            className={activeTab === "Overview" ? "active" : ""}
            onClick={() => handleTabClick("Overview")}
          >
            <Link to="http://localhost:3000/addsample">Add New Sample</Link>
          </li>
          <li
            className={activeTab === "Scheduler" ? "active" : ""}
            onClick={() => handleTabClick("Scheduler")}
          >
            <Link to="http://localhost:3000/addsample/viewaddsample">Sample List</Link>
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

