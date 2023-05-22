import React, { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import './css/addneworder.css'
// import './css/allneworder.css'

export default function Addneworder() {
  const [itemcode, setItemCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brandName, setBrandName] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const navigate = useNavigate();
  

  function sendData(e) {
    e.preventDefault();

    const newOrder = {
      itemcode,
      quantity,
      brandName,
      requiredDate,
    };

   const itemCodeRegex = /^(LB|CC)\d+$/;
   if (!itemCodeRegex.test(itemcode)) {
     Swal.fire({
       icon: "error",
       title: "Invalid Item Code",
       text: "Item code should start with LB or CC.",
     });
     return;
   }
   

   axios
   .post("http://localhost:4500/neworder/add", newOrder)
   .then((response) => {
     Swal.fire({
       icon: "success",
       title: "Order Success",
       confirmButtonText: "OK",
       onConfirm: () => {
         setItemCode("");
         setQuantity("");
         setBrandName("");
         setRequiredDate("");
       },
     }).then(() => navigate("/inventory/add"));

     console.log(response.data.status);
   })
   .catch((err) => {
     alert(err);
   });
  
  }

  return (
    <div className="form-container1">
      <h1>Make New Order</h1>

      <div className="form-container">
        <form onSubmit={sendData}>
          <div className="form-group">
            <label for="itemcode">Item Code</label>
            <input
              type="String"
              className="form-control"
              id="itemcode"
              placeholder="Enter Item Code"
              onChange={(e) => {
                setItemCode(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-container">
    <label for="quantity">Quantity</label>
    <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" min="2000" max="10000" onChange={(e)=>{
        if(e.target.value < 2000){
            setQuantity(2000);
        } else if (e.target.value > 10000){
            setQuantity(10000);
        } else {
            setQuantity(e.target.value);
        }
        
      }}
      required
      />
          </div>
          <div className="form-container">
            <label htmlFor="brandname">Brand Name</label>
            <select
              className="form-control"
              id="brandname"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
              required
            >
              <option value="">Select Brand</option>
              <option value="USF">USF</option>
              <option value="SPMC">SPMC</option>
              <option value="CHICARGO-3">CHICARGO-3</option>
              <option value="Seaskymedical">Seaskymedical</option>
              <option value="Johnson & Johnson">Johnson & Johnson</option>
              <option value="Philips">Philips</option>
              <option value="Abbott">Abbott</option>
              <option value="3m Company">3m Company</option>
              <option value="Siemens Healthineers">Siemens Healthineers</option>
            </select>
          </div>
          <div>
  <label htmlFor="date-input">Select Date:</label>
  <input
    type="date"
    id="date-input"
    name="date-input"
    min={new Date().toISOString().split("T")[0]}
    max={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]}
    onChange={(e) => {
      // Validate the selected date
      const selectedDate = new Date(e.target.value);
      const today = new Date();
      const maxDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

      if (selectedDate < today) {
        alert("Please select a date from today onwards.");
        // You can also reset the date to today's date
        setRequiredDate(today.toISOString().split("T")[0]);
      } else if (selectedDate > maxDate) {
        alert("Please select a date within 7 days from today.");
        // You can also reset the date to 7 days from today
        setRequiredDate(maxDate.toISOString().split("T")[0]);
      } else {
        setRequiredDate(selectedDate.toISOString().split("T")[0]);
      }
    }}
  />
</div>


  <button type="submit" className="btn-primary">Submit</button>
</form>

</div>

</div>

    )
  }