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
      <link rel="stylesheet" type="text/css" href="/css/Header.css" />

      <navh>
        <ul>
          <li
            className={activeTab === "Dashboard" ? "active" : ""}
            onClick={() => handleTabClick("Dashboard")}
          >
            
            <Link to="http://localhost:3000/" className="a"><b>Home</b></Link>
          </li>
          <li
            className={activeTab === "MedicineRequests" ? "active" : ""}
            onClick={() => handleTabClick("MedicineRequests")}
          >
            <Link to="#" className="a"><b>Medicine Delivery Service</b></Link>
          </li>
          <li
            
            onClick={() => handleTabClick("")}
          >
            <Link to="/feedback/contactus" className="a"><b>Contact</b></Link>
          </li>
          <li
            
            onClick={() => handleTabClick("")}
          >
            <Link to="/feedback/myfeedback" className="a"><b>My Feedbacks</b></Link>
          </li>
          <li
            
            onClick={() => handleTabClick("")}
          >
            <Link to="/invoices/add" className="a"><b>Add Item</b></Link>
          </li>
          <li>
            <a href="">Hello {localStorage.getItem("NAME")} </a>
          </li>
        </ul>
      </navh>
    </div>
  );
}

export default Header;