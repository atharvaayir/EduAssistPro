const express=require('express');
const router=express.Router();
const {getAllStudents, getStudentById, createStudent, removeStudent, updateStudent}=require('../controllers/studentController');

router.get('/',getAllStudents);

router.get('/:id',getStudentById);

router.post('/create', createStudent);

router.put('/update/:id', updateStudent);

router.delete('/delete/:id',removeStudent);



module.exports=router;