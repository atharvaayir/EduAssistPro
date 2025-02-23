const mongoose=require('mongoose');
const examSchema=mongoose.Schema({
    name:{
        type:String
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    },
},{timestamps:true});


module.exports=mongoose.model("Exam",examSchema);