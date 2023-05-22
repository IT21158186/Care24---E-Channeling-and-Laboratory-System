import React, { Component } from 'react'

export default class NavBar2 extends Component {
  /*render() {
    return (
      <div>NavBar</div>
      
    )
  }
}*/
render() {

    return (
        
                <div className='dashboard'>
                    <div className="dashboard-nav">
                        <header><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a><a href="#"
                            className="brand-logo">
                                <img src="/images/Care24_Logo-bgRemoved.png" style={{ maxWidth: '125px', align: 'center' }}/> </a></header>
                        <nav className="dashboard-nav-list"><a href="#" className="dashboard-nav-item"><i className="fas fa-home"></i>
                            Home </a><a
                                href="#" className="dashboard-nav-item active"><i className="fas fa-tachometer-alt"></i> Dashboard
                            </a><a
                                href="http://localhost:3000/medicinedelivery/deliveryPerson" className="dashboard-nav-item"><i className="fas fa-file-upload"></i> Delivery Person </a>
                            
                            <div className='dashboard-nav-dropdown'><a href="#" className="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
                                className="fas fa-money-check-alt"></i> Pharmacist </a>
                                <div className='dashboard-nav-dropdown-menu'><a href="http://localhost:3000/medicinedelivery/pharmacist"
                                    className="dashboard-nav-dropdown-item">View Orders</a><a
                                        href="http://localhost:3000/medicinedelivery/pharmacist/billing" className="dashboard-nav-dropdown-item">Billing</a><a
                                            href="http://localhost:3000/medicinedelivery/pharmacist/deliveryassignment" className="dashboard-nav-dropdown-item"> Assign Delivery</a>
                                            <a
                                            href="http://localhost:3000/medicinedelivery/pharmacist/orderSatuses" className="dashboard-nav-dropdown-item"> Set Status</a>
                                </div>
                            </div>
                            <a href="#" className="dashboard-nav-item"><i className="fas fa-cogs"></i> Settings </a><a
                                href="#" className="dashboard-nav-item"><i className="fas fa-user"></i> Profile </a>
                            <div className="nav-item-divider"></div>
                            <a
                                href="#" className="dashboard-nav-item"><i className="fas fa-sign-out-alt"></i> Logout </a>
                        </nav>
                    </div>
                    
                        <header className='dashboard-toolbar'><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a></header>
                        
                    
                </div>

    )
}}
