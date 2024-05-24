const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    Cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:false
    }]
});

module.exports = mongoose.model("user", userSchema);