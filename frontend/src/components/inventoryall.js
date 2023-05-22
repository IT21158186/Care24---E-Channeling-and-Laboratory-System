import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

// import './css/addneworder.css'
// import './css/allneworder.css'


export default function Inventoryall() {
console.log("user")
  const[allinventory,setinventory]=useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
      function getinventory(){
        axios.get("http://localhost:4500/newdispatch/").then((res)=>{
            setinventory(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
      }
      getinventory();
  }, [])
  
     
  //Delete function

  // ...
  
  function deleteinventory(item) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:4500/newdispatch/deletedispatch/"+item._id)
          .then(() => {
            setinventory(allinventory.filter((i) => i._id !== item._id));
            Swal.fire(
              'Deleted!',
              'Your item has been deleted.',
              'success'
            );
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  }
  
  function generateReport() {
    const doc = new jsPDF();
    doc.text("Inventory Items Report", 10, 10);
    const headers = [['Item Code', 'Brand', 'Department', 'Quantity']];
    const data = allinventory.map(({ ItemCode, Brand, Department, Quantity }) => [ItemCode, Brand, Department, Quantity]);
    const totalQuantity = allinventory.reduce((acc, { Quantity }) => acc + Quantity, 0);
    data.push(['', '', 'Total Quantity', totalQuantity, '']);
    doc.autoTable({ head: headers, body: data });
    doc.save('inventory_report.pdf');
  }

  //Search function
  function searchTable(allinventory) {
    return allinventory.filter((i) => {
      return (
        i.ItemCode.toLowerCase().includes(searchInput.toLowerCase()) 
                
      );
    });
  }

  return (

    //Retreve Table
    <body>
      <section id="content">
        <main>

       
          <div className="table-data">

            <div className="order">
              <div className="headers">
                <center><h3>Inventory Items</h3></center>
                
                </div>
                <div className="searchbar">
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Search for Items(Item Code)"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="button" className="btn btn-report" onClick={generateReport}>Generate full inventory Report</button>
                </div>
              <table className="table-striped">
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Brand</th>
                    <th>Department</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTable(allinventory).map((i, index) => {
                    return (
                      <tr key={index}>
                        <td>{i.ItemCode}</td>
                        <td>{i.Brand}</td>
                        <td>{i.Department}</td>
                        <td>{i.Quantity}</td>
                        <td><Link to={`/inventory/updatedispatch/${i._id}`}><button type="button" className="btn btn-outline-success btn-sm" >Update</button></Link></td>
                        <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={(()=>deleteinventory(i))}>Remove</button></td>
                        
                    </tr>
                    )
                    })}
                </tbody>
                </table>
            </div>
            </div>
            
                       
        </main>
    </section>
</body>


  )
}