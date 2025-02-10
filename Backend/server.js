const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const PORT=process.env.PORT || 8000;
const connectDb=require('./config/dbConnection');
const errorHandler=require('./middlewares/errorHandler');
const urlbp=require('body-parser');

//Connection with the db
connectDb();
// to read data from the body of url-encoded type
app.use(urlbp.urlencoded({extended:true}));
//to read data from the body of json type
app.use(express.json());
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log("Server running at PORT:",PORT);
})

