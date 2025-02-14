const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter your username"],
        unique:[true,"Username already exists"]
    },
    email:{
        type:String,
        required:[true,"Please add the username"],
        unique:[true,"Email already exists"],
    },
    password:{
        type:String,
        required:[true,"Please add the user password"],
    }
},{timestamps:true});


module.exports=mongoose.model("User",userSchema);