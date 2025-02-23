const express=require('express');
const router=express.Router();
const { createSubject,getAllSubjects,getSubjectById,updateSubject,deleteSubject} =require('../controllers/subjectController');


router.get('/',getAllSubjects);

router.get('/:id',getSubjectById);

router.post('/create',createSubject);

router.put('/update/:id',updateSubject);

router.delete('/delete/:id',deleteSubject);



module.exports=router;