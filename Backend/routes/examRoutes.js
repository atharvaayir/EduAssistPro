const express=require('express');
const router=express.Router();
const {createExam,getAllExams,getExamById,updateExam,deleteExam}=require('../controllers/examController');


router.get('/',getAllExams);

router.get('/:id',getExamById);

router.post('/create',createExam);

router.put('/update/:id',updateExam);

router.delete('/delete/:id',deleteExam);



module.exports=router;