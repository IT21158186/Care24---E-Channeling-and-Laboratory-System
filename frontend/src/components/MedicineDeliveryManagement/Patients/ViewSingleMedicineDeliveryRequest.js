import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewSingleMedicineDeliveryRequest() {
  const [singleMedicineDeliveryRequest, setSingleMedicineDeliveryRequest] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4500/medicinerequests/view/${id}`)
      .then((res) => {
        if (res.data.success) {
          setSingleMedicineDeliveryRequest(res.data.medicineRequest);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
   
    <div className='container dashboard'>
                <div className='dashboard-app'>
                <div className='dashboard-content'>
                            <div className='container'>
                    <div className='card'>
                    <div className='card-body'>

      
      {singleMedicineDeliveryRequest ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{singleMedicineDeliveryRequest.name}</td>
              <td>{singleMedicineDeliveryRequest._id}</td>
              <td>{singleMedicineDeliveryRequest.deliveryAddress}</td>
              <td>{singleMedicineDeliveryRequest.phone}</td>
              <td>{singleMedicineDeliveryRequest.prescriptionDetails}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default ViewSingleMedicineDeliveryRequest;