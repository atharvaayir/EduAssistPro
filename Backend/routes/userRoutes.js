const express=require('express');
const router=express.Router();
const {loginUser,registerUser, currentUser} =require('../controllers/userControllers');
const validateToken = require('../middlewares/validateToken');

router.post('/login',loginUser);

router.post('/register',registerUser);

router.post('/current',validateToken,currentUser);
module.exports=router;