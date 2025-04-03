const express=require('express');
const router=express.Router();
const {createExam,getAllExams,getExamById,updateExam,deleteExam, examCountHandler}=require('../controllers/examController');


router.get('/',getAllExams);

router.get('/count',examCountHandler);

router.post('/create',createExam);

router.put('/update/:id',updateExam);

router.delete('/delete/:id',deleteExam);

router.get('/:id',getExamById);


module.exports=router;