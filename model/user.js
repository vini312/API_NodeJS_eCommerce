const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
      },
    
      email:{
        type:String,
        required:true
      },
    
      password:{
        type:String,
        required:true
      },
    
      dateCreated:{
        type:Date,
        default:Date.now()
      },
      type:{
        type:String,
        default:"user"
      }
});

//using model middleware "pre" method to salt and hash the password before saving
userSchema.pre("save",function(next){
    //random generated characters (10 is the level)
    bcrypt.genSalt(10)
    .then((salt)=>{
      //encrypting the password with the salt
      bcrypt.hash(this.password, salt)
      .then((encryptedPassword)=>{
        this.password = encryptedPassword;
        //to make the program continue we call next
        next();
      })
      .catch(err=>console.log(`Error during the hashing: ${err}`));
    })
    .catch(err=>console.log(`Error during the salting: ${err}`));
  });
  

//export model that allows CRUD operations on the collections
module.exports = mongoose.model('user', userSchema);