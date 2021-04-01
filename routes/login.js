const router = require("express").Router();
//import the model to be able to use database
const userModel = require("../model/user");
//import the validation function from validation.js
const { loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    try {
        //Stores the validation object
        const validation = loginValidation(req.body);
        // if error is not null the validation fails
        if (validation.error)
            return res.status(400).send(validation.error.details[0].message);

        //check if user is stored on database
        const userFound = await userModel.findOne({ email: req.body.email });
        if (!userFound)
            return res.status(400).send("email not found");

        //Check if password matches with database
        const validPassword = await bcrypt.compare(req.body.password, userFound.password);
        if (!validPassword)
            return res.status(400).send("invalid password");

        //Create a token to assign to the authorized user
        const token = jwt.sign({ _id: userFound._id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router