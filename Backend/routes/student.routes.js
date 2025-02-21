const express=require('express');
const router=express.Router();
const asyncHandler=require('express-async-handler');
const upload = require("../middlewares/uploadExcel");
const {getAllStudents, getStudentById, createStudent, removeStudent, updateStudent,importStudentsFromExcel}=require('../controllers/studentController');

router.get('/',getAllStudents);

router.get('/:id',getStudentById);

router.post('/create', createStudent);

router.put('/update/:id', updateStudent);

router.delete('/delete/:id',removeStudent);

router.post("/importExcel", upload.single("file"), importStudentsFromExcel);


module.exports=router;