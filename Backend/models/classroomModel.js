const mongoose=require('mongoose');
const classroomSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Class name field is required"],
        unique:[true,"Please enter different class name"]
    },
    rows:{
        type:Number,
        required:[true,"Rows field is required"],
    },
    columns:{
        type:Number,
        required:[true,"Columns field is required"],
    },
    benchCapacity:{
        type:Number,
        required:[true,"Bench Capacity field is required"],
    }
},{timestamps:true});


module.exports=mongoose.model("Classroom",classroomSchema);