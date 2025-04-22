const express=require('express');
const router=express.Router();
const {allocateSeats, generateSeatingArrangement}=require('../controllers/seatAllocationController');

router.post('/create',allocateSeats);
router.post('/generate-seating-arrangement',generateSeatingArrangement);

module.exports=router;