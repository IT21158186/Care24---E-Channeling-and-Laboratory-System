const router = require ('express').Router();
const Catalog = require('../models/catalog');

//post
router.route("/add").post((req,res) =>{

    const itemCode = req.body.itemCode
    const description = req.body.description
    const price = Number(req.body.price)

    const newCatalog = new Catalog({

    itemCode,
    description,
    price,

    })

    newCatalog.save().then(()=>{
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//get post
router.route("/").get((req,res)=>{
    
    Catalog.find().then((catalog)=>{
        res.json(catalog)
    }).catch((err)=>{
        console.log(err)
    })

})

//update post
router.route("/update/:id").put(async (req, res) => {
    try {
      const userId = req.params.id;
      const { itemCode, description, price } = req.body;
  
      const updateCatalog = {
        itemCode,
        description,
        price
      };
  
      const update = await Catalog.findByIdAndUpdate(userId, updateCatalog);
      if (update) {
        res.status(200).send({ status: "Item Updated" });
      } else {
        res.status(404).send({ status: "Item not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error with updating data!", error: err.message });
    }
  });

/*const handleDelete = async (req,res) => {
    try{
        const {id} = req.param
        const task = Catalog.findByIdAndDelete(id)

        if(!task){
            return res.status(404).json(`No task with id: ${id}`)
        }

        res.status(200).send("Item/Service Deleted")
    }catch(error) {
        res.status(500).json({ msg: error.massage })
    }
}*/

//delete
router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;

    await Catalog.findByIdAndDelete(userId)
    .then((deleteduser) => {
        res.status(200).send({status: "Item Deleted", user: deleteduser});
    }).catch((err) => {
        console.log(err.massage)
        res.status(500).send({status: "Error with Delete Item", error: err.massage})
    })
})

//fetch an specific post
router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = Catalog.findById(userId)
    .then((user) => {
        res.status(200).send({status: "Item Fetched", user})
    }).catch(() => {
        console.log(err.massage)
        res.status(500).send({status: "Error with get Item"})
    })
})

module.exports = router;