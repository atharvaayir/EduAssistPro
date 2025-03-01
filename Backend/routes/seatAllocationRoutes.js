const express=require('express');
const router=express.Router();
const {allocateSeats}=require('../controllers/seatAllocationController');

router.post('/create',allocateSeats);

module.exports=router;