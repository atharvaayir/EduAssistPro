const express=require('express');
const router=express.Router();
const {allocateSeats, generateSeatingArrangement}=require('../controllers/seatAllocationController');

router.post('/create',allocateSeats);
router.get('/generate-seating-arrangement',generateSeatingArrangement);

module.exports=router;