const router = require ('express').Router();
let Invoice = require("../models/invoice")

router.route("/add").post((req,res) =>{

    const invoiceNumber = Number(req.body.invoiceNumber)
    const itemCode = req.body.itemCode
    const description = req.body.description
    const quantity = Number(req.body.quantity)
    const price = Number(req.body.price)
    const amount = Number(req.body.amount)

    const newInvoice = new Invoice({

        invoiceNumber,
        itemCode,
        description,
        quantity,
        price,
        amount

    })

    newInvoice.save().then(()=>{
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{
    
    Invoice.find().then((invoice)=>{
        res.json(invoice)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/update/:id").put((req,res) => {
    let userId = req.params.id;
    const {itemCode,description,quantity,price,amount} = req.body

    const updateInvoice = {
        itemCode,
        description,
        quantity,
        price,
        amount
    }

    const update = Invoice.findByIdAndUpdate(userId, updateInvoice)
    .then(()=>{
        res.status(200).send({status: "Item Updated", user: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data!!", error:err.massage});
    })
})


/*router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;

    await Invoice.findByIdAndDelete(userId)
    .then((deleteduser) => {
        res.status(200).send({status: "Item Deleted", user: deleteduser});
    }).catch((err) => {
        console.log(err.massage)
        res.status(500).send({status: "Error with Delete Item", error: err.massage})
    })
})*/

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
  
    await Invoice.findByIdAndRemove(userId)
      .then((deletedItem) => {
        if (deletedItem) {
          res.status(200).send({ status: "Item Deleted", item: deletedItem });
        } else {
          res.status(404).send({ status: "Item not found" });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with Delete Item", error: err.message });
      });
  });  

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Invoice.findById(userId)
    .then(() => {
        res.status(200).send({status: "Item Fetched", user:user})
    }).catch(() => {
        console.log(err.massage)
        res.status(500).send({status: "Error with get Item"})
    })
})

module.exports = router;