const express=require('express');
const router=express.Router();
const {createInvigilator,getAllInvigilators,deleteInvigilator,authenticateInvigilator}= require('../controllers/invigilatorControllers');


router.get('/',getAllInvigilators);
router.post('/create',createInvigilator);
router.delete('/delete/:id',deleteInvigilator);
router.post('/login',authenticateInvigilator)






module.exports=router;