import React from 'react';

function Sidebar(){
    return(
        <div>
            <section id="sidebar">
                <div className='container'>
                <div className='col-md-4'></div>
                <div className='col-md-6'>

                    <br/><img className='brandLogo' src={require('./images/logo.png')}/><br/><br/></div></div>
                  
                    <ul className="side-menu top">
                        <li>
                            <a href="">
                                <i className='bx bxs-dashboard' ></i>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className='bx bx-calendar' ></i>
                                <span className="text">Contact us</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className='bx bx-user' ></i>
                                <span className="text">About us</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className='bx bx-log-out' ></i>
                                <span className="text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </section>

        </div>
    )
}
export default Sidebar;