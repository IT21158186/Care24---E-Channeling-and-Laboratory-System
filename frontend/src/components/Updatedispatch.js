import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// import './css/addneworder.css'
// import './css/allneworder.css'


export default function Updatedispatch() {

    const[Quantity, setQuantity] = useState("");
    
    const navigate = useNavigate();



    const[data, setData] = useState([]);

   

    const { Did } = useParams();
    const [updateDis, setUpdatedispatch] = useState({
        ItemCode: '',
        Brand: '',
        Department: '',
        Quantity: ''
      
    });


    //Fetch data
    useEffect(() => {
        getUpdatedispatch();
    }, []);



    useEffect(() => {
        axios.get("http://localhost:4500/neworder/")
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    })


    function getUpdatedispatch() {
        axios.get("http://localhost:4500/newdispatch/getdispatch/" + Did)
            .then((res) => {
                console.log(res);
                setUpdatedispatch({
                    ItemCode: res.data.newdispatchOrdr.ItemCode,
                    Brand: res.data.newdispatchOrdr.Brand,
                    Department: res.data.newdispatchOrdr.Department,
                    Quantity: res.data.newdispatchOrdr.Quantity,
                    
                    
                });

            }).catch((err) => {
                alert(err.message);
            })
    }

    const handleChange = (e) => {
        setUpdatedispatch({
            ...updateDis,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
         //console.log(getUpdatedispatch); // or save the data to your backend
        axios.put('http://localhost:4500/newdispatch/updatedispatch/' + Did, updateDis)
        .then((response) => {
            console.log(response.data.status)
            //console.log("is working")
            if (response.data.status === "Stocks Updated") {
                Swal.fire({
                    title: "Success!",
                    text: "Stocks Updated Successfully!",
                    icon: "success",
                    confirmButtonText: "Done",
                    confirmButtonColor: "#3085d6",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {

                        //console.log("work here")
                        //console.log("work here1")
                        setTimeout(() => {
                            navigate('/inventory');
                        }, 2000)
                    }
                })

            }
        })
            .catch((error) => {
                console.log(error);
            });
    };


    return (

        <div className="form-container1">
            <h1>Update stocks</h1>

            <form onSubmit={handleSubmit} >
        
        <div className="form-group">
          <label for="itemcode">Item Code</label>
          <input type="text" value={updateDis.ItemCode} readOnly />


                </div>


               
                <div className="form-container">
                    <label htmlFor="Brand">Select the Brand:</label>
                    <div className="col">
                        <select name="type" value={updateDis.Brand} className="form-select" aria-label="role"
                            onChange={(e) => {
                                setUpdatedispatch({
                                    ...updateDis,
                                    Brand: e.target.value,
                                });
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
                    <div className="col">
                        <select name="type" value={updateDis.Department} className="form-select" aria-label="role"
                            onChange={(e) => {
                                setUpdatedispatch({
                                    ...updateDis,
                                    Department: e.target.value,
                                });
                            }}
                >
                  <option value="Laboratory">Laboratory</option>
                  <option value="Channeling Center">Channeling Center</option>
                  </select>
                </div>
                </div>


                
                <div className="form-container">
    <label for="Quantity">Quantity</label>
    <input type="number" className="form-control" id="Quantity" value={updateDis.Quantity} placeholder="Enter Quantity" min="2000" max="10000" onChange={(e)=>{
        if(e.target.value < 2000){
            setQuantity(2000);
        } else if (e.target.value > 10000){
            setQuantity(10000);
        } else {
            setQuantity(e.target.value);
        }
        setUpdatedispatch({
            ...updateDis,
            Quantity: e.target.value,
        });
      }}/>


                </div>
               <br></br>
               
                <button type="submit" className="btn btn-primary">Save</button><br/>
                <Link to={'/inventory'}><button className="btn btn-danger">Cancel</button></Link>
            </form>
        </div>

    )

}
