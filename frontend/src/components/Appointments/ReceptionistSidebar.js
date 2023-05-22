import React from 'react';

function ReceptionistSidebar(){
    return(
        <div>
            <section id="sidebar">
                <div className='container'>
                <div className='col-md-4'></div>
                <div className='col-md-6'>

                    <br/><img className='brandLogo' src={require('../images/logo.png')}/><br/><br/></div></div>
                  
                    <ul className="side-menu top">
                        <li>
                            <a href="/Dashboard">
                                <i className='bx bxs-dashboard' ></i>
                                <span className="text">Dashboard</span>
                            </a>
                        </li>

                        <li>
                            <a href="/AboutUs">
                                <i className='bx bx-user' ></i>
                                <span className="text">About Us</span>
                            </a>
                        </li>
                        <li>
                            <a href="/ContactUs">
                                <i className='bx bx-calendar' ></i>
                                <span className="text">Contact Us</span>
                            </a>
                        </li>
                        
                        <li>
                            <a href="/Logout">
                                <i className='bx bx-log-out' ></i>
                                <span className="text">Log-out</span>
                            </a>
                        </li>
                    </ul>
                </section>

        </div>
    )
}
export default ReceptionistSidebar;