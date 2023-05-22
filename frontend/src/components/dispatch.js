/*import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// import './css/addneworder.css'
// import './css/allneworder.css'

export default function Addispatch(){ 
    
  const[ItemCode, setItemcode] = useState("");
  const[Brand, setBrand] = useState("");
  const[Department, setDepartment] = useState("");
  const[Quantity, setQuantity] = useState("");
  const[names, setNames] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get("http://localhost:4500/newdispatch/").then((response)=>{
          setNames(response.data.map(item => item.ItemCode));
      }).catch((err)=>{
          alert(err)
      })
  }, []);

  function sendData(e){
      e.preventDefault();

      // Validate item code
      const ItemcodeRegex = /^(LB|CC)\d+$/;
      if (!ItemcodeRegex.test(ItemCode)) {
          Swal.fire({
              icon: "error",
              title: "Invalid Item Code",
              text: "Item code should start with LB or CC.",
          });
          return;
      }

      // Check if item code already exists
      if (names.includes(ItemCode)) {
          Swal.fire({
              icon: "error",
              title: "Item Code Already Exists",
              text: "please Update details in Inventory table",
          });
          return;
      }
            
      const newDispatch={
          ItemCode,
          Brand,
          Department,
          Quantity
         
      }
     
      axios.post("http://localhost:4500/newdispatch/addispatch",newDispatch).then((response)=>{
          Swal.fire({
              icon: 'success',
              title: 'Dispatch Success',
              confirmButtonText: 'OK'
            }).then(() => navigate("/inventory/addispatch"));
      
          setItemcode("");
          setBrand("");
          setDepartment("");
          setQuantity("");
          console.log(response.data.status)

      }).catch((err)=>{
          alert(err)
      })
  }

    return(
        <div className="fullform">
        <div className="form-container1">
            <h1>Dispatch stocks</h1>

<div className="form-container">
        
  <div className="form-group">
    <label for="itemcode">Item Code</label>
    <input type="String" className="form-control" id="ItemCode" placeholder="Enter Item Code" onChange={(e)=>{

         setItemcode(e.target.value);
    }}
    
    />
    
  </div>
  <div className="form-container">
                    <label htmlFor="Brand">Select the Brand:</label>
                    <div className="col">
                        <select name="type"  className="form-select" aria-label="role"
                            onChange={(e) => {
                                setBrand(
                                    e.target.value,
                               );
                            }}
                >
              
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
    
  </div>
  <div className="form-container">
              <label htmlFor="Department">Select the Department:</label>
              <button className="department dropdown-toggle" type="button" id="doctorDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {Department ? Department : "Click to Select"}
    
              </button>
                <ul className="dropdown-menu" aria-labelledby="doctorDropdown">
                  <li><a className="dropdown-item" onClick={() => setDepartment("Laboratory")}>Laboratory</a></li>
                  <li><a className="dropdown-item" onClick={() => setDepartment("Channeling Center")}>Channeling Center</a></li>
                  
                </ul>
  </div>


  <div className="form-container">
    <label for="Quantity">Quantity</label>
    <input type="number" className="form-control" id="Quantity" placeholder="Enter Quantity" min="2000" max="10000" onChange={(e)=>{
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


 <form onSubmit={sendData}>
        <button type="submit" className="btn-primary">
    Submit
  </button>

 </form>

</div>

</div>
      </div>

    )
}*/

import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Addispatch(){ 
    
  const[ItemCode, setItemcode] = useState("");
  const[Brand, setBrand] = useState("");
  const[Department, setDepartment] = useState("");
  const[Quantity, setQuantity] = useState("");
  const[names, setNames] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get("http://localhost:4500/newdispatch/").then((response)=>{
          setNames(response.data.map(item => item.ItemCode));
      }).catch((err)=>{
          alert(err)
      })
  }, []);

  function sendData(e){
      e.preventDefault();

      // Validate item code
      const ItemcodeRegex = /^(LB|CC)\d+$/;
      if (!ItemcodeRegex.test(ItemCode)) {
          Swal.fire({
              icon: "error",
              title: "Invalid Item Code",
              text: "Item code should start with LB or CC.",
          });
          return;
      }

      // Check if item code already exists
      if (names.includes(ItemCode)) {
          Swal.fire({
              icon: "error",
              title: "Item Code Already Exists",
              text: "please Update details in Inventory table",
          });
          return;
      }

      // Check if all fields are filled
    if (!ItemCode || !Brand || !Department || !Quantity) {
        Swal.fire({
          icon: "error",
          title: "Empty Fields",
          text: "Please fill in all the fields.",
        });
        return;
      }
            
      const newDispatch={
          ItemCode,
          Brand,
          Department,
          Quantity
         
      }
     
      axios.post("http://localhost:4500/newdispatch/addispatch",newDispatch).then((response)=>{
          Swal.fire({
              icon: 'success',
              title: 'Dispatch Success',
              confirmButtonText: 'OK'
            }).then(() => navigate("/inventory/addispatch"));
      
          setItemcode("");
          setBrand("");
          setDepartment("");
          setQuantity("");
          console.log(response.data.status)

      }).catch((err)=>{
          alert(err)
      })
  }

    return(
        <div className="fullform">
        <div className="form-container1">
            <h1>Dispatch stocks</h1>

<div className="form-container">
        
  <div className="form-group">
    <label for="itemcode">Item Code</label>
    <input type="String" className="form-control" id="ItemCode" placeholder="Enter Item Code" onChange={(e)=>{

         setItemcode(e.target.value);
    }}
    required
    
    />
    
  </div>
  <div className="form-container">
                    <label htmlFor="Brand">Select the Brand:</label>
                    <div className="col">
                        <select name="type"  className="form-select" aria-label="role"
                            onChange={(e) => {
                                setBrand(
                                    e.target.value,
                               );
                            }}
                >
              
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
    
  </div>
  <div className="form-container">
              <label htmlFor="Department">Select the Department:</label>
              <button className="department dropdown-toggle" type="button" id="doctorDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {Department ? Department : "Click to Select"}
    
              </button>
                <ul className="dropdown-menu" aria-labelledby="doctorDropdown">
                  <li><a className="dropdown-item" onClick={() => setDepartment("Laboratory")}>Laboratory</a></li>
                  <li><a className="dropdown-item" onClick={() => setDepartment("Channeling Center")}>Channeling Center</a></li>
                  
                </ul>
  </div>


  <div className="form-container">
    <label for="Quantity">Quantity</label>
    <input type="number" className="form-control" id="Quantity" placeholder="Enter Quantity" min="2000" max="10000" onChange={(e)=>{
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


 <form onSubmit={sendData}>
        <button type="submit" className="btn-primary">
    Submit
  </button>

 </form>

</div>

</div>
      </div>

    )
}