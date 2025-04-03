const express = require("express");
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    studentCountHandler
} = require("../controllers/studentController");

router.get("/", getAllStudents); // Get all students
router.post("/create", createStudent); // Create a student
router.delete("/delete/:id", deleteStudent); // Delete a student
router.patch("/update/:id", updateStudent); // Update a student
router.get("/count", studentCountHandler); // return Student for frontend
router.get("/:id", getStudentById); // Get a single student by ID

module.exports = router;
