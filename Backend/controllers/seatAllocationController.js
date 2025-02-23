const SeatAllocation=require('../models/seatAllocationModel');
const asyncHandler=require('express-async-handler');
const allocateSeats=asyncHandler(async (req,res)=>{
    console.log("Seat allocated");
    res.status(200).json({msg:"This is seat allocation module"});
});



module.exports={allocateSeats};