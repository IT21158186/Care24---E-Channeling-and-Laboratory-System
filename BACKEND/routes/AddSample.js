
const express = require('express');
const newAddSampleRoute=express.Router();

let newAddSampleRequest=require('../models/AddSample');


newAddSampleRoute.post('/newaddsample/create', async (request, response) => {
    try {
        let addsampleRequest = new newAddSampleRequest(request.body);
        await addsampleRequest.save();
        return response.status(200).json({
            success: "New Sample Add Request created successfully."
        });
    } catch (err) {
        return response.status(400).json({
            error: err
        });
    }    
});


newAddSampleRoute.get('/newaddsample/view/:id', async (request, response) => {
    try {
        let addsampleID = request.params.id;

        const addsampleRequest = await newAddSampleRequest.findById(addsampleID);

        if(!addsampleRequest) {
            return response.status(404).json({success:false, message: 'Add Sample not found'});
        }

        return response.status(200).json({
            success:true,
            addsampleRequest
        });

    } catch (error) {
        return response.status(400).json({success:false, error});
    }
});


newAddSampleRoute.get('/newaddsample', (req, res) => {
    newAddSampleRequest.find()
    .then((availablerequests) => {
        return res.status(200).json({
          success: true,
          existingRequests: availablerequests
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err
        });
      });
  });


newAddSampleRoute.put('/newaddsample/edit/:id', (req,res)=>{
    newAddSampleRequest.findByIdAndUpdate(req.params.id, {$set:req.body})
        .then(addsampleRequest => {
            return res.status(200).json({ success: "Successfully Updated." });
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});


newAddSampleRoute.delete('/newaddsample/remove/:id', (req,res)=>{
    newAddSampleRequest.findByIdAndRemove(req.params.id)
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


module.exports = newAddSampleRoute;

