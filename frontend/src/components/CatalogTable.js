import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function CatalogTable() {
  const [items, setItems] = useState([]);

  //edit data
  function editRow(id) {
    // Handle edit functionality here
    console.log("Editing item with ID:", id);
  }

  // fetch data from the database
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8070/catalog/");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete data
  function handleDelete(item) {
    axios
      .delete("http://localhost:8070/catalog/delete/" + item._id)
      .then(() => {
        setItems(items.filter((i) => i._id !== item._id));
        alert("Deleted Successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div><div className='dashboard'>
    <div className='dashboard-app'>
      <div className='dashboard-content'>
      <div>
        <h1>Thathsara S.M.K</h1>
        <h1>ITP Project</h1>
        <h1>SLIIT</h1>
      </div>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
        <h1 className="font-bold uppercase tracking-wide text-xl mb-10 flex">
          Service Catalog
        </h1>
        <table width="100%" className="mb-10">
          <thead>
            <tr className="bg-gray-100 p-1">
              <td className="font-bold">Service/Item Code</td>
              <td className="font-bold">Description</td>
              <td className="font-bold">Price</td>
              <td className="font-bold">Delete</td>
              <td className="font-bold">Edit</td>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemCode}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => handleDelete(item)}>
                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                  </button>
                </td>
                <td>
                  <Link to={`/update/${item._id}`}>
                    <button onClick={() => editRow(item._id)}>
                      <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main></div></div></div>
    </div>
  );
}
