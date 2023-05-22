const router = require("express").Router();
let Contactus = require("../../models/Feedback/Contactus");

http://localhost:8090/contactus/cadd

router.route("/cadd").post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const newContactus = new Contactus({
        name, email, message
    })

    newContactus.save().then(() => {
        res.json("Message Sent!")
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;

