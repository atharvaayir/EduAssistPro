const express=require('express');
const asyncHandler=require('express-async-handler');
const ExamTimetable=require('../models/examTimeTableModel');
const SeatAllocation=require('../models/seatAllocationModel');
const {createTransporter,sendEmail}=require('../utils/sendEmail');
const Student=require('../models/studentModel');
const scheduleEmails=asyncHandler(async (req,res)=>{
    const {exam_id}=req.body;
    const examTimetable=await ExamTimetable.findOne({_id:exam_id});
    if(!examTimetable){
        res.status(400);
        throw new Error("Exam doesn't exist");
    }
    const seatAllocation=await SeatAllocation.findOne({exam_id});
    if(!seatAllocation){
        res.status(400);
        throw new Error("Seats for the given exam not allocated");
    }
    const students=new Set();
    seatAllocation.allocations.forEach((subject) => {
        subject.classrooms.forEach((classroom) => {
            classroom.allocated_seats.forEach((seat) => {
                if (seat.student_id) {
                    students.add(seat.student_id); 
                }
            });
        });
    });
    const transporter= await createTransporter();
    const text="You have an exam scheduled";
    const subject="Exam Notice";
    students.forEach(async (_id)=>{
        const student=await Student.findOne({_id});
        //console.log(student.email);
        await sendEmail(student.email,subject,text,transporter);   
    });
    
    res.status(200).json({msg:"Emails to students scheduled"})

});




module.exports={scheduleEmails};
