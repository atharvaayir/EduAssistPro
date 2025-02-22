const express=require('express');
const router=express.Router();
const {createInvigilator,getAllInvigilators}= require('../controllers/invigilatorControllers');


router.get('/',getAllInvigilators);
router.post('/create',createInvigilator);






module.exports=router;