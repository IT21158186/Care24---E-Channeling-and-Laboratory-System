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
            className={activeTab === "Dashboard" ? "active" : ""}
            onClick={() => handleTabClick("Dashboard")}
          >
            
            <Link to="http://localhost:3000/medicinedelivery/pharmacist/" className="a"><b>Medicine Delivery Requests</b></Link>
          </li>
          <li
            className={activeTab === "Billing" ? "active" : ""}
            onClick={() => handleTabClick("Billing")}
          >
            <Link to="http://localhost:3000/medicinedelivery/pharmacist/billing" className="a"><b>Billing</b></Link>
          </li>

          <li
            className={activeTab === "AssignDelivery" ? "active" : ""}
            onClick={() => handleTabClick("AssignDelivery")}
          >
            <Link to="http://localhost:3000/medicinedelivery/pharmacist/deliveryassignment" className="a"><b>Assign Delivery</b></Link>
          </li>

          <li
            className={activeTab === "MDStatuses" ? "active" : ""}
            onClick={() => handleTabClick("MDStatuses")}
          >
            <Link to="http://localhost:3000/medicinedelivery/pharmacist/orderSatuses" className="a"><b>Statuses</b></Link>
          </li>


          <li>
            <a href="">Hello {localStorage.getItem("NAME")}! </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;