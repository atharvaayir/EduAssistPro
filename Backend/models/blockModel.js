const mongoose=require('mongoose');
const blockSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Block Name field is required"],
        unique:[true,"Name already used"]
    },
    classrooms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Classroom"
    }],
},{timestamps:true});


module.exports=mongoose.model("Block",blockSchema);