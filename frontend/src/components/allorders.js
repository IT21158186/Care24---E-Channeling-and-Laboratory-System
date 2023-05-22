import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';

// import './css/addneworder.css'
// import './css/allneworder.css'
import './Appointments/CSS/Scheduler.css'


export default function Allorders() {

const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");



const[neworders,setneworders]=useState([]);
const [searchInput, setSearchInput] = useState("");



  function generateReport() {
    const filteredOrders = neworders.filter((order) => {
      return (
        new Date(order.requiredDate) >= new Date(startDate) &&
        new Date(order.requiredDate) <= new Date(endDate)
      );
    });
  
    const reportData = filteredOrders.map((order) => {
      return [order.itemcode, order.quantity, order.brandName, order.requiredDate];
    });
  
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Item Code", "Quantity", "Brand Name", "Required Date"]],
      body: reportData,
    });
    doc.save("report.pdf");
  }
  
  useEffect(()=>{
      function getneworders(){
        axios.get("http://localhost:4500/neworder/all").then((res)=>{
            setneworders(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
      }
      getneworders();
  }, [])
  
   

    
  //Delete function
  function deleteneworders(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:4500/neworder/delete/" + item._id)
          .then(() => {
            setneworders(neworders.filter((i) => i._id !== item._id));
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    })
  
  
  }




  //Search function
  function searchTable(neworders) {
    return neworders.filter((i) => {
      return (
        i.itemcode.toLowerCase().includes(searchInput.toLowerCase()) 
        
      );
    });
  }

  return (
<div className='dashboard'>
    <div className='dashboard-app'>
      <div className='dashboard-content'>
    
    <body>
      <section id="content">
        <main>

       
          <div className="table-data">

            <div className="order">
              <div className="headers">
                <center><h3>All New Orders</h3></center>
                </div>
                <div className="searchbar">
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Search for Order History(Item Code)"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <br/>
                <div className="reportgen">
    <div className="daterange">
 <label htmlFor="start-date">Start Date:</label>
 <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
 <label htmlFor="end-date">End Date:</label>
 <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

</div>
<br/>
<button type="button" className="btn-onwards" onClick={generateReport}>Generate Report</button>
</div>
                
                </div>
                
            </div>
            
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Quantity</th>
                    <th>Brand Name</th>
                    <th>Required Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTable(neworders).map((i, index) => {
                    return (
                      <tr key={index}>
                        <td>{i.itemcode}</td>
                        <td>{i.quantity}</td>
                        <td>{i.brandName}</td>
                        <td>{i.requiredDate}</td>
                        
                        <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={(()=>deleteneworders(i))}>Remove</button></td>

                    </tr>
                    )

                    })}
                </tbody>
                </table>
                
               
   
              </main>
    </section>
    
    
</body></div></div></div>
 

  )
}