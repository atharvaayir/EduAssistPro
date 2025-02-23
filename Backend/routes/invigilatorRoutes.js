const express=require('express');
const router=express.Router();
const {createInvigilator,getAllInvigilators,deleteInvigilator}= require('../controllers/invigilatorControllers');


router.get('/',getAllInvigilators);
router.post('/create',createInvigilator);
router.delete('/delete/:id',deleteInvigilator);






module.exports=router;