import React from 'react';
import { Link } from 'react-router-dom';

import './css/custom.css'
import './font-awesome-4.7.0/css/font-awesome.min.css'

function handleSignOut() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("USERTYPE");
    localStorage.removeItem("NAME");
    localStorage.removeItem("USERID");
  
    window.location.href = '/signup';
  }
  function handleMDM() {
    if (localStorage.getItem("USERTYPE")==="Patient") {
      window.location.href = '/medicinerequests/dashboard';
    } else if (localStorage.getItem("USERTYPE")==="Pharmacist") {
      window.location.href = '/medicinedelivery/pharmacist';
    } else if(localStorage.getItem("USERTYPE")==="Delivery Person") {
      window.location.href = '/medicinedelivery/deliveryPerson/';
    }
    else{
      alert("Please sign in to continue...")
    }
  }

  function appointment(){
    if (localStorage.getItem("USERTYPE")==="Patient") {
        window.location.href = '/appointment/doc';
    }
      else{
        alert("Please sign in to continue...")
      }
  }

  function contact(){
    window.location.href = '/feedback/dropfeedback';
    // if (localStorage.getItem("USERTYPE")==="Patient") {
        
    // }
    //   else{
    //     alert("Please sign in to continue...")
    //   }
  }

const HomePage = () => {
  return (
    <div>
        
        {/* <div className='dashboard-content'> <p>usertype : {localStorage.getItem("USERTYPE")}</p>
                    <p>user : {localStorage.getItem("EMAIL")}</p>
                    <p>id : {localStorage.getItem("USERID")}</p>
                    <p>name : {localStorage.getItem("NAME")}</p>
                    
                    <button onClick={handleSignOut}>Sign Out</button>
                    <button onClick={handleMDM}>Medicine Delivery Portal</button></div> */}


    {/* <!-- banner --> */}
    <div className="jumbotron jumbotron-fluid" id="banner" style={{backgroundImage: 'url(/img/bg-11.jpg)'}}>
        <div className="container text-center text-md-left">
            <header>
                <div className="row justify-content-between">
                    <div className="col-2">
                        {/* <img src="/img/logo.png" alt="logo"/> */}
                    </div>
                    <div className="col-6 align-self-center text-right">
                        <a href="#" className="text-white lead"></a>
                    </div>
                </div>
            </header>
            <h1 data-aos="fade" data-aos-easing="linear" data-aos-duration="1000" data-aos-once="true" className="display-3 text-white font-weight-bold my-5">
            	Your Ultimate<br/>
            	Healthcare Partner
            </h1>
            <p data-aos="fade" data-aos-easing="linear" data-aos-duration="1000" data-aos-once="true" className="lead text-white my-4">
            Welcome to Care-24!
                <br/> Manage your healthcare needs with ease and convenience
            </p>
            <a href="/signin" data-aos="fade" data-aos-easing="linear" data-aos-duration="1000" data-aos-once="true" className="btn my-4 font-weight-bold atlas-cta cta-green">Get Started</a>
        </div>
    </div>
    {/* <!-- three-blcok --> */}
    <div className="container my-5 py-2">
        <h2 className="text-center font-weight-bold my-5">Empowering Your Health Journey</h2>
        <div className="row">
            <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000" data-aos-once="true" className="col-md-4 text-center">
                
            </div>
            <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-once="true" className="col-md-4 text-center">
                <img src="/img/logo.png" alt="Phishing Detect" className="mx-auto"/>
            
            </div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" className="col-md-4 text-center">
                
            </div>
        </div>
    </div>
    {/* <!-- feature (skew background) --> */}
    <div className="jumbotron jumbotron-fluid feature" id="feature-first">
        <div className="container my-5">
            <div className="row justify-content-between text-center text-md-left">
                <div data-aos="fade-right" data-aos-duration="1000" data-aos-once="true" className="col-md-6">
                    <h2 className="font-weight-bold">Appointment</h2>
                    <p className="my-4">book appointments with doctors and schedule lab tests with ease.
                        <br/> It is time to Make an Appointment</p>
                    {/* <a href="#" className="btn my-4 font-weight-bold atlas-cta cta-blue">Appointment Booking</a> */}
                    <button onClick={appointment} className="btn my-4 font-weight-bold atlas-cta cta-blue">Appointment Booking</button>
                </div>
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-once="true" className="col-md-6 align-self-center">
                    <img src="/img/feature-1.png" alt="Take a look inside" className="mx-auto d-block"/>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- feature (green background) --> */}
    <div className="jumbotron jumbotron-fluid feature" id="feature-last">
        <div className="container">
            <div className="row justify-content-between text-center text-md-left">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-once="true" className="col-md-6 flex-md-last">
                    <h2 className="font-weight-bold">Your Health, Simplified.</h2>
                    <p className="my-4">
                    Designed to facilitate the delivery of medications to patients 
who are unable to pick them up in person
                        <br/> - Care24 Online Medicine Delivery Service.
                    </p>
                    {/* <a href="#" className="btn my-4 font-weight-bold atlas-cta cta-blue">Visit Medicine Delivery Portal</a> */}
                    <button onClick={handleMDM} className="btn my-4 font-weight-bold atlas-cta cta-blue">Medicine Delivery Portal</button>
                </div>
                <div data-aos="fade-right" data-aos-duration="1000" data-aos-once="true" className="col-md-6 align-self-center flex-md-first">
                    <img src="img/feature-2.png" alt="Safe and reliable" className="mx-auto d-block"/>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- price table --> */}
    {/* <div className="container my-5 py-2" id="price-table">
        <h2 className="text-center font-weight-bold d-block mb-3">Check our pricing</h2>
        <div className="row">
            <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000" data-aos-once="true" className="col-md-4 text-center py-4 mt-5">
                <h4 className="my-4">STARTUP</h4>
                <p className="font-weight-bold">$ <span className="display-2 font-weight-bold">0</span> / MO.</p>
                <ul className="list-unstyled">
                    <li>Up to 5 Documents</li>
                    <li>Up to 3 Reviews</li>
                    <li>5 team Members</li>
                    <li>Limited Support</li>
                </ul>
                <a href="#" className="btn my-4 font-weight-bold atlas-cta cta-ghost">Get Free</a>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" className="col-md-4 text-center py-4 mt-5 rounded" id="price-table__premium">
                <h4 className="my-4">PREMIUM</h4>
                <p className="font-weight-bold">$ <span className="display-2 font-weight-bold">10</span> / MO.</p>
                <ul className="list-unstyled">
                    <li>Up to 15 Documents</li>
                    <li>Up to 10 Reviews</li>
                    <li>25 team Members</li>
                    <li>Limited Support</li>
                </ul>
                <a href="#" className="btn my-4 font-weight-bold atlas-cta cta-green">Get Free</a>
            </div>
            <div data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000" data-aos-once="true" className="col-md-4 text-center py-4 mt-5">
                <h4 className="my-4">PROFESSIONAL</h4>
                <p className="font-weight-bold">$ <span className="display-2 font-weight-bold">30</span> / MO.</p>
                <ul className="list-unstyled">
                    <li>Unlimited Documents</li>
                    <li>Unlimited Reviews</li>
                    <li>Unlimited Members</li>
                    <li>Unlimited Support</li>
                </ul>
                <a href="#" className="btn my-4 font-weight-bold atlas-cta cta-ghost">Get Free</a>
            </div>
        </div>
    </div> */}
    {/* <!-- client --> */}
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-md-2 py-2 align-self-center">
                    <img src="img/client-1.png" className="mx-auto d-block"/>
                </div>
                <div className="col-sm-4 col-md-2 py-2 align-self-center">
                    <img src="img/client-3.png" className="mx-auto d-block"/>
                </div>
                <div className="col-sm-4 col-md-2 py-2 align-self-center">
                    <img src="img/client-2.png" className="mx-auto d-block"/>
                </div>
                <div className="col-sm-4 col-md-2 py-2 align-self-center">
                    <img src="img/client-4.png" className="mx-auto d-block"/>
                </div>
                <div className="col-sm-4 col-md-2 py-2 align-self-center">
                    <img src="img/client-3.png" className="mx-auto d-block"/>
                </div>
                <div className="col-sm-4 col-md-2 py-2 align-self-center">
                    <img src="img/client-1.png" className="mx-auto d-block"/>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- contact --> */}
    <div className="jumbotron jumbotron-fluid" id="contact" style={{backgroundImage: 'url(img/contact-bk.jpg)'}}>
        <div className="container my-5">
            <div className="row justify-content-between">
                <div className="col-md-6 text-white">
                    <h2 className="font-weight-bold">Contact Us</h2>
                    <p className="my-4">
                        Te iisque labitur eos, nec sale argumentum scribentur,
                        <br/> augue disputando in vim. Erat fugit sit at, ius lorem.
                    </p>
                    <ul className="list-unstyled"><b>
                        <li>Email : contact@care24.com</li>
                        <li>Phone : 0111234567</li>
                        <li>Address : 464/465S, New Kandy Road, Malabe</li></b>
                    </ul>
                </div>
                <div className="col-md-6">
                    <form style={{marginTop:'75px', textAlign:'center'}}>
                    	<div className="row">
	                            <label htmlFor="cf"><b><a href="/feedback/dropfeedback">Any Compliance or Feedback?</a></b></label>
	                    </div><a href="/feedback/dropfeedback">
                        <button  className="btn font-weight-bold atlas-cta atlas-cta-wide cta-green my-3">Let Us Know!</button></a>
                    </form>
                </div>
            </div>
        </div>
    </div>

	{/* <!-- copyright --> */}
	<div className="jumbotron jumbotron-fluid" id="copyright">
        <div className="container">
            <div className="row justify-content-between">
            	<div className="col-md-6 text-white align-self-center text-center text-md-left my-2">
                <b>Copyright © 2023 Care-24.</b>
                </div>
                <div className="col-md-6 align-self-center text-center text-md-right my-2" id="social-media">
                    <a href="#" className="d-inline-block text-center ml-2">
                    	<i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="d-inline-block text-center ml-2">
                    	<i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="d-inline-block text-center ml-2">
                    	<i className="fa fa-medium" aria-hidden="true"></i>
                    </a>
                    <a href="#" className="d-inline-block text-center ml-2">
                    	<i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    {/* <!-- AOS -->
    <script src="js/aos.js"></script>
    <script>
      AOS.init({
      });
    </script> */}

    
    </div>
  );
};

export default HomePage;
