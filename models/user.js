const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
        default:"NORMAL",
    }

},{timestamps:true});

const user=mongoose.model("user",userschema);

module.exports=user;