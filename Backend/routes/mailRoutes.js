const express=require('express');
const router=require('express').Router();
const {scheduleEmails}=require('../controllers/mailControllers');

//mention exam_id;
router.post('/sendmailtostudents',scheduleEmails);


module.exports=router;