const express = require('express');
const newDeliveryStageRoute = express.Router();


const { body, validationResult } = require('express-validator');

const newDelivery = require('../../models/MedicineDeliveryManagement/DeliveryProcess'); 

newDeliveryStageRoute.post('/newmedicinerequest/delivery/create', [body('orderID').notEmpty(),], async (request, response) => {
    try {
        const deliveryData = new newDelivery(request.body);
        await deliveryData.save();
        return response.status(200).json({
            success: "New Medicine Delivery Request created successfully."
        });
    } catch (err) {
        return response.status(400).json({
            error: err
        });
    }    
});

newDeliveryStageRoute.put('/medicinedelivery/edit/:id', (req,res)=>{
    newDelivery.findByIdAndUpdate(req.params.id, {$set:req.body})
        .then(deliveryRequest => {
            return res.status(200).json({ success: "Successfully Updated." });
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});


newDeliveryStageRoute.get('/medicinedelivery/view', (req, res) => {
    newDelivery.find()
      .then((availabledeliveryerequests) => {
        return res.status(200).json({
          success: true,
          existingRequests: availabledeliveryerequests
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err
        });
      });
  });

  newDeliveryStageRoute.get('/medicinedelivery/view/:id', async (request, response) => {
    try {
        let medicinerequestID = request.params.id;

        const deliveryRequest = await newDelivery.findById(medicinerequestID);

        if(!deliveryRequest) {
            return response.status(404).json({success:false, message: 'Medicine delivery request not found'});
        }

        return response.status(200).json({
            success:true,
            deliveryRequest
        });

    } catch (error) {
        return response.status(400).json({success:false, error});
    }
});


newDeliveryStageRoute.delete('/medicinedelivery/remove/:id', (req,res)=>{
    newDelivery.findByIdAndRemove(req.params.id)
        .then((deletedRequest) => {
            return res.json({
                message: "Successfully deleted",
                deletedRequest
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "Deletion unsuccessful.",
                err
            });
        });
});
  

module.exports = newDeliveryStageRoute;