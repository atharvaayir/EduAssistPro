const asyncHandler = require('express-async-handler');
const Exam=require('../models/examModel');
const Department=require('../models/departmentModel');
// Create a new exam
const createExam = asyncHandler(async (req, res) => {
    const { name, department } = req.body;

    if (!name || !department) {
        res.status(400);
        throw new Error('Exam name and department are required');
    }

    // Check if the department exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
        res.status(400);
        throw new Error('Invalid department ID');
    }

    // Check for duplicate exam name within the same department
    const existingExam = await Exam.findOne({ name, department });
    if (existingExam) {
        res.status(400);
        throw new Error('Exam with this name already exists in the department');
    }

    const exam = await Exam.create({ name, department });
    res.status(201).json(exam);
});

// Get all exams
const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find().populate('department', 'name');
    res.status(200).json(exams);
});

// Get a single exam by ID
const getExamById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate('department', 'name');

    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    res.status(200).json(exam);
});

// Update an exam
const updateExam = asyncHandler(async (req, res) => {
    const { name, department } = req.body;
    const { id } = req.params;

    if (!name || !department) {
        res.status(400);
        throw new Error('Exam name and department are required');
    }

    const exam = await Exam.findById(id);
    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    // Check if the department exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
        res.status(400);
        throw new Error('Invalid department ID');
    }

    // Check for duplicate name within the department
    const existingExam = await Exam.findOne({ name, department });
    if (existingExam && existingExam._id.toString() !== id) {
        res.status(400);
        throw new Error('Exam with this name already exists in the department');
    }

    exam.name = name;
    exam.department = department;
    const updatedExam = await exam.save();

    res.status(200).json(updatedExam);
});

// Delete an exam
const deleteExam = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const exam = await Exam.findById(id);
    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    await exam.deleteOne();
    res.status(200).json({ message: 'Exam deleted successfully' });
});

const examCountHandler = asyncHandler(async (req,res) => {
    const count = await Exam.countDocuments({});
    return res.status(200).json({count});
});

// Export all functions as default
module.exports= {
    createExam,
    getAllExams,
    getExamById,
    updateExam,
    deleteExam,
    examCountHandler
};
