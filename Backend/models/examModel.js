const mongoose=require('mongoose');
const examSchema=mongoose.Schema({
    name:{
        type:String
    },
    department:{
        type:String
    },
},{timestamps:true});


module.exports=mongoose.model("Exam",examSchema);