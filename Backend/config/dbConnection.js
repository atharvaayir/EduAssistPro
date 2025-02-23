const mongoose=require('mongoose');
const connectDb=async ()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connection with DB Successful");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDb;
