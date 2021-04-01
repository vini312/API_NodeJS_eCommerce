const express = require("express");
const router = express.Router();
//import the model to be able to use database
const userModel = require("../model/user");
//import the validation function from validation.js
const { registerValidation } = require("../validation");



router.post("/", (req, res) => {

    //Stores the error from the validation object
    const validation = registerValidation(req.body);
    // if error is not null the validation fails
    if (validation.error)
        return res.status(400).send(validation.error.details[0].message);

    //check if email is already registered
    userModel.findOne({remail:req.body.email})
        .then((userFound)=>{
            if(userFound != null)
                return res.status(400).send("email already being used");
        })
        .catch(err=>{ console.log(`Error on findOne ${err}`) });

    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(savedUser => {
        res.send(savedUser);
        })
        .catch(err => {
            res.send(`Error creating the user on MongoDB: ${err}`);
        });
 })

module.exports = router;