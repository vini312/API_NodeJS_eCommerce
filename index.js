const express = require("express");
const mongoose = require("mongoose");
//load environment variables from keys.env
require('dotenv').config({path:"./config/keys.env"});

// create the object of type express
const app = express();

//Middleware
app.use(express.json())

//map express to router middlewares
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/products", require("./routes/products"));

//variable to use port 3000 when running locally
const HTTP_PORT = process.env.PORT || 3000;

//mongoose connection method
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Successfully connected to MongoDB Database`);
    //Run the server after successfully connecting to the database
    app.listen(HTTP_PORT,()=>{
        // message when the server starts
        console.log(` The server is runing on port ${HTTP_PORT}`)
    });
})
.catch(err=>console.log(`Error when trying to connect to MongoDB Database ${err}`));