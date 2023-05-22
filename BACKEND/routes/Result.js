const express = require('express');
const newResultRoute=express.Router();

let newResultRequest=require('../models/Result');

newResultRoute.post('/newresult/create', async (request, response) => {
    try {
        let resultRequest = new newResultRequest(request.body);
        await resultRequest.save();
        return response.status(200).json({
            success: "Result Add Request created successfully."
        });
    } catch (err) {
        return response.status(400).json({
            error: err
        });
    }    
});

newResultRoute.get('/newresult/view/:id', async (request, response) => {
    try {
        let resultID = request.params.id;

        const resultRequest = await newResultRequest.findById(resultID);

        if(!resultRequest) {
            return response.status(404).json({success:false, message: 'Add Result not found'});
        }

        return response.status(200).json({
            success:true,
            resultRequest
        });

    } catch (error) {
        return response.status(400).json({success:false, error});
    }
});


newResultRoute.get('/newresult', (req, res) => {
    newResultRequest.find()
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

newResultRoute.put('/newresult/edit/:id', (req,res)=>{
    newResultRequest.findByIdAndUpdate(req.params.id, {$set:req.body})
        .then(resultRequest => {
            return res.status(200).json({ success: "Successfully Updated." });
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});

newResultRoute.delete('/newresult/remove/:id', (req,res)=>{
    newResultRequest.findByIdAndRemove(req.params.id)
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

module.exports = newResultRoute;
