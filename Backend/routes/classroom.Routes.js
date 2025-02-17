const express=require('express');
const validateToken = require('../middlewares/validateToken');
const router=express.Router();
const { allClassroomsHandler,createClassroomHandler, deleteClassroomHandler, updateClassroomHandler, singleClassroomDetailsHandler } = require("../controllers/classroom.controller");

router.get("/",allClassroomsHandler);
router.post("/create",createClassroomHandler);
router.delete("/delete/:id",deleteClassroomHandler);
router.patch("/update/:id",updateClassroomHandler);
router.get("/:id",singleClassroomDetailsHandler);

module.exports = router;