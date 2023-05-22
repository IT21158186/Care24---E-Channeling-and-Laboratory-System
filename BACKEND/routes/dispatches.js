const newdispatchOrderRouter = require ("express").Router();
let newdispatch=require("../models/dispatch");

newdispatchOrderRouter.route("/addispatch").post((req,res)=>{

    const ItemCode= req.body.ItemCode;
    const Brand = req.body.Brand;
    const Department = req.body.Department;
    const Quantity = Number(req.body.Quantity);
    


    const newdispatchOrdr= new newdispatch({

        ItemCode,
        Brand,
        Department,
        Quantity
       
    })

    newdispatchOrdr.save().then(()=>{
        res.json("Stocks dispatched!")
    }).catch((err)=>{
        console.log(err);
    })
})


newdispatchOrderRouter.route("/").get((req,res)=>{

    newdispatch.find().then((newdispatchOrders)=>{
        res.json(newdispatchOrders)
    }).catch((err)=>{
        console.log(err)
    })
})

newdispatchOrderRouter.route("/updatedispatch/:Did").put(async(req,res)=>{
    let DiID = req.params.Did;
    const {ItemCode,Brand,Department,Quantity}= req.body;

    const updatedispatchOrder={
        ItemCode,
        Brand,
        Department,
        Quantity
    }
    
    const update = await newdispatch.findByIdAndUpdate(DiID,updatedispatchOrder)
    .then(()=>{
    res.status(200).send({status: "Stocks Updated"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data",error: err.message});
})
   
})

newdispatchOrderRouter.route("/deletedispatch/:Did").delete(async(req,res)=>{
    let DiID = req.params.Did;

    await newdispatch.findByIdAndDelete(DiID)
    .then(()=>{
        res.status(200).send({status: " Stocks deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data",error: err.message});
    })
})

newdispatchOrderRouter.route("/getdispatch/:Did").get(async(req,res)=>{
    let DiID = req.params.Did;
    
    const user=await newdispatch.findById(DiID)
    .then((newdispatchOrdr)=>{
        res.status(200).send({status:"Stocks fetched",newdispatchOrdr})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with order fetching",error: err.message});
    })


})

module.exports= newdispatchOrderRouter;