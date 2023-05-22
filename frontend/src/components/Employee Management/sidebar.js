import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div>
            <section id="sidebar">
                <div className='container'>
                    <div className='col-md-2'></div>
                    <div className='col-md-4'>

                        <br /><img className='brandLogo' src={require('../images/logo.png')} /><br /><br /></div></div>
                {/* <div className='container'>
                    <h4 >Employee Management Dashboard</h4>
                </div> */}
                <Link style={{ color: "#fff", textTransform: "capitalize", margin: "20px" }} to="/employee/view">
                    <p className='sieder__title'>
                        Employee Management dashboard
                    </p>
                </Link>


                <ul style={{ listStyle: 'none',padding:'20px auto' }} className="side-menu top" >

                    {/* <li>
                        <a >
                            <i className='bx bxs-dashboard' ></i>
                        </a>

                    </li> */}
                    <li>
                        <a  style={{color:"#F5FFFA",fontWeight:"700",textAlign:"center"}}  className='sider__li__a' href="/">
                            <i className='bx bx-calendar' ></i>
                            <span className="text">Help</span>
                        </a>
                    </li>
                    <li>
                        <a  style={{color:"#F5FFFA",fontWeight:"700",textAlign:"center"}}  className='sider__li__a' href="/">
                            <i className='bx bx-user' ></i>
                            <span className="text">About Us</span>
                        </a>
                    </li>
                    <li style={{ position: "absolute", width: "85%", bottom: "20px" }}>
                        <a  style={{color:"#F5FFFA",fontWeight:"700",textAlign:"center"}}  className='sider__li__a' href="/Logout">
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