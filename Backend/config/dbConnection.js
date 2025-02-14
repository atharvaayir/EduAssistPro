const mongoose=require('mongoose');
const connectDb=async ()=>{
    try{
        const connect=await mongoose.connect('mongodb://127.0.0.1:27017/EduAssistPro');
        console.log("Connection with DB Successful");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDb;
