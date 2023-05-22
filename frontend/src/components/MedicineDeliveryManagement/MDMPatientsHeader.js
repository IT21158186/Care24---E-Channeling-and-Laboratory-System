import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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
                        <Link to="http://localhost:3000/medicinerequests/dashboard" className="a"><b>Dashboard</b></Link>
                    </li>
                    
                    <li
                        className={activeTab === "MedicineRequests" ? "active" : ""}
                        onClick={() => handleTabClick("MedicineRequests")}
                    >
                        <Link to="http://localhost:3000/medicinerequests/view" className="a"><b>Medicine Requests</b></Link>
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