const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) res.json(student);
  else res.status(404).json({ message: "Student not found" });
};
const createStudent = asyncHandler(async (req, res) => {
  const { name, department,rollNo, semester } = req.body;
  const existingStudent = await Student.findOne({ rollNo });

  if (existingStudent) {
    res.status(400);
    throw new Error("Student with this Roll Number already exists");
  }
  if (!name || !department || !rollNo || !semester) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const student = await Student.create({
    name,
    department,
    rollNo,
    semester
  });
  res.status(201).json(student);
});

const updateStudent = asyncHandler(async (req, res) => {
    const { name, rollNo, semester, department } = req.body;
    const { id } = req.params; // Student ID from URL

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
        res.status(404);
        throw new Error('Student not found');
    }

    // Validate required fields
    if (!name || !rollNo || !semester || !department) {
        res.status(400);
        throw new Error('All fields (name, rollNo, semester, department) are required');
    }

    // Check if rollNo is already taken by another student
    if (rollNo !== student.rollNo) {
        const existingStudent = await Student.findOne({ rollNo });
        if (existingStudent) {
            res.status(400);
            throw new Error('Roll Number already exists');
        }
    }

    // Update student fields
    student.name = name;
    student.rollNo = rollNo;
    student.semester = semester;
    student.department = department;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
});


const removeStudent=async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student) res.json({ message: 'Student deleted' });
    else res.status(404).json({ message: 'Student not found' });
};

module.exports = { getAllStudents, getStudentById, createStudent ,removeStudent,updateStudent};
