const express=require('express');
const router=express.Router();
const {createExamTimetable,getExamTimetables,getExamTimetableById,updateExamTimetable,deleteExamTimetable}=require('../controllers/examTimetableController');


router.get('/',getExamTimetables);

router.get('/:id',getExamTimetableById);

router.post('/create',createExamTimetable);

router.put('/update/:id',updateExamTimetable);

router.delete('/delete/:id',deleteExamTimetable);



module.exports=router;