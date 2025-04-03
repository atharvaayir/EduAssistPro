const asyncHandler = require('express-async-handler');
const Subject = require('../models/subjectModel');
const Department = require('../models/departmentModel');

// Create a new subject
const createSubject = asyncHandler(async (req, res) => {
    const { name, department, code, semester } = req.body;

    if (!name || !department || !code || !semester) {
        res.status(400);
        throw new Error('All fields are required: name, department, code, and semester.');
    }
    
    // Check if the department exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
        res.status(400);
        throw new Error('Invalid department ID.');
    }

    // Check for duplicate subject code within the same department
    const existingSubject = await Subject.findOne({ code, department });
    if (existingSubject) {
        res.status(400);
        throw new Error('Subject with this code already exists in the department.');
    }

    const subject = await Subject.create({ name, department, code, semester });
    res.status(201).json({subject:subject,message:"Object Created"});
});

// Get all subjects
const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find().populate('department', 'name');
    res.status(200).json(subjects);
});

// Get a single subject by ID
const getSubjectById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findById(id).populate('department', 'name');

    if (!subject) {
        res.status(404);
        throw new Error('Subject not found.');
    }

    res.status(200).json(subject);
});

// Update a subject
const updateSubject = asyncHandler(async (req, res) => {
    const { name, department, code, semester } = req.body;
    const { id } = req.params;

    if (!name || !department || !code || !semester) {
        res.status(400);
        throw new Error('All fields are required: name, department, code, and semester.');
    }

    const subject = await Subject.findById(id);
    if (!subject) {
        res.status(404);
        throw new Error('Subject not found.');
    }

    // Check if the department exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
        res.status(400);
        throw new Error('Invalid department ID.');
    }

    // Check for duplicate subject code within the department
    const existingSubject = await Subject.findOne({ code, department });
    if (existingSubject && existingSubject._id.toString() !== id) {
        res.status(400);
        throw new Error('Subject with this code already exists in the department.');
    }

    subject.name = name;
    subject.department = department;
    subject.code = code;
    subject.semester = semester;

    const updatedSubject = await subject.save();
    res.status(200).json({updatedSubject,message:"Subject Updated"});
});

// Delete a subject
const deleteSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
        res.status(404);
        throw new Error('Subject not found.');
    }

    await subject.deleteOne();
    res.status(200).json({ message: 'Subject deleted successfully' });
});

// Export all functions
module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};
