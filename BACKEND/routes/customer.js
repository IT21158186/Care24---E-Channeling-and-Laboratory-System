const router = require ('express').Router();
const Customer = require('../models/customer');

router.route("/add").post((req,res) =>{

    const clientName = req.body.clientName
    const clientAddress = req.body.clientAddress
    const clientPhone = req.body.clientPhone
    const clientEmail = req.body.clientEmail
    const invoiceNumber = Number(req.body.invoiceNumber)
    const invoiceDate = req.body.invoiceDate
    const total = Number(req.body.total)

    const newCustomer = new Customer({

        clientName,
        clientAddress,
        clientPhone,
        clientEmail,
        invoiceNumber,
        invoiceDate,
        total

    })

    newCustomer.save().then(()=>{
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })

})

module.exports = router;