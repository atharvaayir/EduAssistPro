const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const urlbp = require("body-parser");
const classroomRoutes = require("./routes/classroom.routes");
const blocksRoutes = require("./routes/blocks.routes");
const {createTransporter,sendEmail}=require('./utils/sendEmail');

//Connection with the db

connectDb();
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true, // Allow cookies and authentication headers
// }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies and authentication headers
  })
);

// to read data from the body of url-encoded type
app.use(urlbp.urlencoded({ extended: true }));
//to read data from the body of json type
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/classroom", classroomRoutes);
app.use("/api/blocks", blocksRoutes);
app.use("/api/pdf",require("./routes/pdf.routes"));

const sendmails=async()=>{
const transporter=await createTransporter();
for(let i=0;i<50;i++)
{
  await sendEmail("atharvaayir5@gmail.com","This is subject",`This is message, ${i}`,transporter);
// await new Promise(resolve => setTimeout(resolve, 2000));
}
console.log("Done");
}

//sendmails();

//paths to be tested
app.use('/api/students',require('./routes/student.routes'));
app.use('/api/departments',require('./routes/departmentRoutes'));
app.use('/api/exams',require('./routes/examRoutes'));
app.use('/api/subjects',require('./routes/subjectRoutes'));
app.use('/api/examtimetables',require('./routes/examTimeTableroutes'));//
app.use('/api/invigilators',require('./routes/invigilatorRoutes'));
app.use('/api/seatallocation',require('./routes/seatAllocationRoutes'));//
app.use('/api/mail',require('./routes/mailRoutes'));
app.use(errorHandler);

// app route to test incoming feature
app.get("/api/test",(req, res) => {
  res.send("prepare a test method");  
})

app.listen(PORT, () => {
  console.log("Server running at PORT:", PORT);
});
