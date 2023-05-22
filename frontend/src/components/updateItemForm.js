import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateCatalog, setUpdateCatalog] = useState({
    itemCode: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    getCatalog();
  }, []);

  function getCatalog() {
    axios.get(`http://localhost:8070/catalog/get/`+id)
      .then((res) => {
        console.log(res);
        setUpdateCatalog({
          itemCode: res.data.catalog.itemCode,
          description: res.data.catalog.description,
          price: res.data.catalog.price,
        });
      }).catch((err) => {
        alert(err.message);
      });
  }

  const handleChange = (e) => {
    setUpdateCatalog({
      ...updateCatalog,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updateCatalog.itemCode || !updateCatalog.description || !updateCatalog.price) {
      swal({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
        button: "OK",
      });
    } else {
      const updatedItem = {
        itemCode: updateCatalog.itemCode,
        description: updateCatalog.description,
        price: updateCatalog.price,
      };

      axios
        .put(`http://localhost:8070/catalog/update/`+id, updatedItem)
        .then(() => {
          swal({
            title: "Item Updated!",
            text: "The item has been updated successfully.",
            icon: "success",
            button: "OK",
          });

          setTimeout(() => {
            navigate('/invoices/catalog');
          }, 2000);
        })
        .catch((err) => {
          swal({
            title: "Error!",
            text: "Something went wrong, check your connection!",
            icon: "error",
            button: "OK",
          });
        });
    }
  };

  return (
    <><div className='dashboard'>
    <div className='dashboard-app'>
      <div className='dashboard-content'>
      <div>
        <h1>Thathsara S.M.K</h1>
        <h1>ITP Project</h1>
        <h1>SLIIT</h1>
      </div>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold uppercase tracking-wide text-xl mb-10 flex">
            Update Item/Service
          </h1>
          <div className="flex flex-col">
            <label htmlFor="itemCode">Service/Item Code</label>
            <input
              type="text"
              name="itemCode"
              id="itemCode"
              placeholder="Enter Item Code"
              value={updateCatalog.itemCode || ""}
              onChange={handleChange}
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter Description"
              value={updateCatalog.description || ""}
              onChange={handleChange}
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Enter Price"
              value={updateCatalog.price || ""}
              onChange={handleChange}
            />
          </div>
  
          <button
            type="submit"
            className="mb-5 bg-yellow-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
          >
            Update Item
          </button>
        </form>
      </main></div></div></div>
    </>
  );
}