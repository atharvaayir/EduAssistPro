const mongoose=require('mongoose');
const invigilatorModel=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name of invigilator"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },

},{timestamps:true});

module.exports=mongoose.model("Invigilator",invigilatorModel);