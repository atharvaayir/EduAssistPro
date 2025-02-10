const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const PORT=process.env.PORT || 8000;
const connectDb=require('./config/dbConnection');
const errorHandler=require('./middlewares/errorHandler');

//Connection with the db
connectDb();
//to read data from the body of post request
app.use(express.json());
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log("Server running at PORT:",PORT);
})

