const router = require ("express").Router();
let neworder=require("../models/neworder");

router.route("/add").post((req,res)=>{

    const itemcode = req.body.itemcode;
    const quantity = Number(req.body.quantity);
    const brandName = req.body.brandName;
    const requiredDate = req.body.requiredDate;

    const NewOrder= new neworder({

        itemcode,
        quantity,
        brandName,
        requiredDate,
    })

    NewOrder.save().then(()=>{
        res.json("New order Added!")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/all").get((req,res)=>{

    neworder.find().then((newOrders)=>{
        res.json(newOrders)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:Oid").put(async(req,res)=>{
    let OrID = req.params.Oid;
    const {itemcode,quantity,brandName,requiredDate}= req.body;

    const updateOrder={
        itemcode,
        quantity,
        brandName,
        requiredDate,

    }
    
    const update = await neworder.findByIdAndUpdate(OrID,updateOrder)
    .then(()=>{
    res.status(200).send({status: " Order Updated"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data",error: err.message});
})
   
})

router.route("/delete/:Oid").delete(async(req,res)=>{
    let OrID = req.params.Oid;

    await neworder.findByIdAndDelete(OrID)
    .then(()=>{
        res.status(200).send({status: " Order deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data",error: err.message});
    })
})

router.route("/get/:Oid").get(async(req,res)=>{
    let OrID = req.params.Oid;
    
    const ordr = await neworder.findById(OrID)
    .then((NewOrder)=>{
        res.status(200).send({status:"order fetched",NewOrder})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with order fetching",error: err.message});
    })


})

module.exports= router;