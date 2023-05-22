import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import ViewMedicineDeliveryRequests from './components/MedicineDeliveryManagement/Patients/ViewMedicineDeliveryRequests';

import ViewSingleMedicineDeliveryRequest from './components/MedicineDeliveryManagement/Patients/ViewSingleMedicineDeliveryRequest';
import CreateMedicineDeliveryRequest from './components/MedicineDeliveryManagement/Patients/CreateMedicineDeliveryRequest';

import ViewNewMedicineDeliveryRequests from './components/MedicineDeliveryManagement/Pharmacist/ViewNewMedicineDeliveryRequests'
import AddBillToMedicineDeliveryRequests from './components/MedicineDeliveryManagement/Pharmacist/AddBillToMedicineDeliveryRequests'
import DeliveryAssignment from './components/MedicineDeliveryManagement/Pharmacist/AssignDeliveryForMDM'
import PharmacistOrderStatusUpdater from './components/MedicineDeliveryManagement/Pharmacist/UpdateOrderStatus'

import DeliveryDashboard from './components/MedicineDeliveryManagement/Deliverer/DeliveryOfMedicineRequests'


import MDMSideNavBar from './components/MedicineDeliveryManagement/MDMSideNavBar';
import NavBarPharmacist from './components/MedicineDeliveryManagement/MDMPharmacistHeader';
import NavBarDeliverer from './components/MedicineDeliveryManagement/MDMDeliveryHeader';
import NavBarPatients from './components/MedicineDeliveryManagement/MDMPatientsHeader';

import Header from './components/Header';




import Headerinventory from './components/headerinventory';
import SidebarInventory from './components/sidebar';
import Addneworder from './components/addneworder'
import Allorders from './components/allorders'
import Addispatch from './components/dispatch'
import Inventoryall from './components/inventoryall'
import Updatedispatch from './components/Updatedispatch'



//Appointments
import ReceptionistHeader from './components/Appointments/ReceptionistHeader';
import ReceptionistSidebar from './components/Appointments/ReceptionistSidebar';
import MakeDocApmt from './components/Appointments/MakeDocApmt';
import MakeLabapmt from './components/Appointments/MakeLabApmt';
import Scheduler from './components/Appointments/Scheduler';
import UpdateDocApmt from './components/Appointments/UpdateDocApmt';
import UpdateLabApmt from './components/Appointments/UpdateLabApmt';
import Overview from "./components/Appointments/Overview";
import UserDocApmt from "./components/Appointments/UserMakeDocApmt"
import UserLabApmt from "./components/Appointments/UserMakeLabApmt"

//Feedback
import Contactus from './components/Feedback/Contactus';
import DropFeedbacks from './components/Feedback/DropFeedbacks';
import MyFeedbacks from './components/Feedback/MyFeedbacks';
import UpdateMyFeedbacks from './components/Feedback/UpdateMyFeedbacks';
import FAQS from './components/Feedback/FAQS';
import UserSidebar from './components/Feedback/Usersidebar';





import EmpHeader from './components/Employee Management/headerEmployee';

import AddEmployee from './components/Employee Management/AddEmployee';
import AllEmployees from './components/Employee Management/AllEmployees';

import UpdateEmployee from './components/Employee Management/UpdateEmployee';

import AddPayroll from './components/Employee Management/AddPayroll';
import AllPayrolls from './components/Employee Management/AllPayrolls';
import UpdatePayroll from './components/Employee Management/UpdatePayroll';

import Leave_stat from './components/Employee Management/leave_stat';

import AddLeave from './components/Employee Management/AddLeave';
import UpdateLeave from './components/Employee Management/UpdateLeave';

import ViewEmployee from './components/Employee Management/Dashboard';
import ViewEmployeeLink from './components/Employee Management/employee_page';

import AddAttendance from './components/Employee Management/AddAttendance';
import AllAttendances from './components/Employee Management/AllAttendance';
import UpdateAttendance from './components/Employee Management/UpdateAttendance';
import My from './components/Employee Management/Attendance';
import QR from './components/Employee Management/QR';
import AllLeaves from './components/Employee Management/AllLeave';






import SampleHead from './components/SampleNavBar';
import AddSampleForm from './components/AddSampleForm';
import ViewAddSample from './components/ViewAddSample';
import AddResult from './components/AddResult';
import UpdateSample from './components/UpdateSample';
import Result from './components/Result';
import Test from './components/Test';

import ViewData from './components/ViewData';



import Invoice from "./components/Invoice"
import AddItemForm from "./components/AddItemForm";
import Catalogtable from "./components/CatalogTable";
import UpdateItemForm from "./components/updateItemForm";




import CreateUser from './components/administrator/CreateUser';
import AllUsers from './components/administrator/AllUsers';
import EditUser from './components/administrator/EditUser';
import UserDetails from './components/administrator/UserDetails';
import Register from './components/loginRegister/Register';
import Login from './components/loginRegister/Login';





export default class App extends Component {

  render() {

    return (

      <BrowserRouter>

        <NavBar />
        <SideBarNav />

        <div className="">
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/signin' Component={SignIn}></Route>
            <Route path='/signup' Component={SignUp}></Route>

            <Route path='/medicinerequests/dashboard' exact Component={CreateMedicineDeliveryRequest}></Route>
            <Route path='/medicinerequests/view' Component={ViewMedicineDeliveryRequests}></Route>
            <Route path='/medicinerequests/viewS/:id' Component={ViewSingleMedicineDeliveryRequest}></Route>


            <Route path='/medicinedelivery/pharmacist' Component={ViewNewMedicineDeliveryRequests}></Route>
            <Route path='/medicinedelivery/pharmacist/billing' Component={AddBillToMedicineDeliveryRequests}></Route>
            <Route path='/medicinedelivery/pharmacist/deliveryassignment' Component={DeliveryAssignment}></Route>
            <Route path='/medicinedelivery/pharmacist/orderSatuses' Component={PharmacistOrderStatusUpdater}></Route>

            <Route path='/medicinedelivery/deliveryPerson/' Component={DeliveryDashboard}></Route>



            <Route path="/inventory/all" exact Component={Allorders} />
            <Route path="/inventory/add" exact Component={Addneworder} />
            <Route path="/inventory/addispatch" exact Component={Addispatch} />
            <Route path="/inventory" exact Component={Inventoryall} />
            <Route path="/inventory/updatedispatch/:Did" exact Component={Updatedispatch} />



            {/*Appointments*/}
            <Route path="/appointments/add" exact Component={MakeDocApmt} />
            <Route path="/appointments/lab_add" exact Component={MakeLabapmt} />
            <Route path="/appointments/scheduler" exact Component={Scheduler} />
            <Route path="/appointments/update/:id" exact Component={UpdateDocApmt} />
            <Route path="/appointments/labupdate/:id" exact Component={UpdateLabApmt} />
            <Route path="/appointment/doc" exact Component={UserDocApmt}/>
            <Route path="/appointment/lab" exact Component={UserLabApmt}/>
            {/*Feedback*/}
            <Route path="/appointments/overview" element={<Overview />} />
            <Route path="/feedback/faqs" Component={FAQS} />
            <Route path="/feedback/contactus" Component={Contactus} />
            <Route path="/feedback/dropfeedback" Component={DropFeedbacks} />
            <Route path="/feedback/myfeedback" Component={MyFeedbacks} />
            <Route path="/feedback/updatefeedback/:id" Component={UpdateMyFeedbacks} />



            <Route path='employee/add' exact Component={AddEmployee}></Route>
            <Route path='employee/get/:id' exact Component={UpdateEmployee}></Route>
            <Route path='employee/' exact Component={AllEmployees}></Route>

            <Route path="leave/add" exact Component={AddLeave} ></Route>
            <Route path="leave/get/:id" exact Component={UpdateLeave} ></Route>
            <Route path="leave/" exact Component={AllLeaves} ></Route>

            <Route path="payroll/add" exact Component={AddPayroll}></Route>
            <Route path="payroll/get/:id" exact Component={UpdatePayroll} ></Route>
            <Route path="payroll/" exact Component={AllPayrolls} ></Route>

            <Route path="attendance/add" exact Component={AddAttendance} ></Route>
            <Route path="attendance/" exact Component={AllAttendances} ></Route>
            <Route path="attendance/get/:id" exact Component={UpdateAttendance} ></Route>
            <Route path="attendance/add/get/:id" exact Component={AddAttendance} ></Route>
            <Route path="leave/add/get/:id" exact Component={AddLeave} ></Route>
            <Route path="payroll/add/get/:id" exact Component={AddPayroll} ></Route>

            {/* <Route path="employee/view" exact Component={ViewEmployeeLink} ></Route> */}
            <Route path="employee/view/" exact Component={ViewEmployeeLink} ></Route>

            {/* <My/> */}
            <Route path="attendance/qr/" exact Component={My} ></Route>
            <Route path="attendance/code/" exact Component={QR} ></Route>

            <Route path='employee/view/:id' element={
              <div>
                <ViewEmployee />
                <Leave_stat />
                <AddLeave />
              </div>
            } ></Route>




            <Route path='/addsample' exact Component={AddSampleForm}></Route>
            <Route path='/addsample/viewaddsample' exact Component={ViewAddSample}></Route>
            <Route path='/addsample/:id' exact Component={AddResult}></Route>
            <Route path='/addsample/edit/:id' exact Component={UpdateSample}></Route>
            <Route path='/addsample/view/:id' exact Component={Result}></Route>

            <Route path='/addsample/test/edit/:id' exact Component={Test}></Route>
            <Route path='/addsample/viewdata/:id' exact Component={ViewData}></Route>



            <Route path='/invoices' exact Component={Invoice}></Route>

            <Route path="/invoices/add" Component={AddItemForm} />
            <Route exact path="/invoices/update/:id" element={<UpdateItemForm />} />
            <Route path="/invoices/catalog" Component={Catalogtable} />




            <Route path="/addUsers" exact component={CreateUser}></Route>
            <Route path="/allUsers" exact component={AllUsers}></Route>
            <Route path="/users/:id" exact component={UserDetails}></Route>
            <Route path="/editUsers/:id" exact component={EditUser}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>


          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}



function NavBar() {
  const location = useLocation();

  if (location.pathname.startsWith('/medicinedelivery/pharmacist')) {
    return <NavBarPharmacist />;
  } else if (location.pathname.startsWith('/medicinerequests/dashboard')) {
    return <NavBarPatients />;
  } else if (location.pathname.startsWith('/medicinerequests/view')) {
    return <NavBarPatients />;
  } else if (location.pathname.startsWith('/medicinerequests/viewS/:id')) {
    return <NavBarPatients />;
  } else if (location.pathname.startsWith('/medicinedelivery/deliveryPerson')) {
    return <NavBarDeliverer />;
  } else if (location.pathname.startsWith('/inventory')) {
    return <Headerinventory />;
  } else if (location.pathname.startsWith('/appointments')) {
    return <ReceptionistHeader />;
  } else if (location.pathname.startsWith('/feedback')) {
    return <Header />;
  } else if (location.pathname.startsWith('/employee') || location.pathname.startsWith('/attendance') || location.pathname.startsWith('/leave') || location.pathname.startsWith('/payroll')) {
    return <EmpHeader />;
  } else if (location.pathname.startsWith('/addsample')) {
    return <SampleHead />;
  } else if (location.pathname.startsWith('/invoices')) {
    return <Header />;
  } else if (location.pathname.startsWith('/appointment')) {
    return <Header />;
  }else if (location.pathname.startsWith('/signin')) {
    return <Header />;
  }else if (location.pathname.startsWith('/signup')) {
    return <Header />;
  }else {
    return ;
  }
}

function SideBarNav() {
  const location = useLocation();

  if (location.pathname === ('/')) {
    return;
  } else if (location.pathname.startsWith('/signin') || location.pathname.startsWith('/signup')) {
    return <NavBarDeliverer />;
  } else {
    return <MDMSideNavBar />;
  }
}