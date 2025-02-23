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


//paths to be tested
app.use('/api/students',require('./routes/student.routes'));//
app.use('/api/departments',require('./routes/departmentRoutes'));
app.use('/api/exams',require('./routes/examRoutes'))//
app.use('/api/subjects',require('./routes/subjectRoutes'));//
app.use('/api/examtimetables',require('./routes/examTimeTableroutes'));//
app.use('/api/invigilators',require('./routes/invigilatorRoutes'));//
app.use('/api/seatallocation',require('./routes/seatAllocationRoutes'));//
app.use(errorHandler);


app.listen(PORT, () => {
  console.log("Server running at PORT:", PORT);
});
