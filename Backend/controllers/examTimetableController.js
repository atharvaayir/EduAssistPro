const asyncHandler = require('express-async-handler');
const ExamTimetable = require('../models/examTimeTableModel');

// Create Exam Timetable
const createExamTimetable = asyncHandler(async (req, res) => {
    const { exam_id, exams } = req.body;

    if (!exam_id || !exams || !Array.isArray(exams) || exams.length === 0) {
        res.status(400);
        throw new Error('Exam ID and a list of exams are required.');
    }

    // Check if a timetable already exists for this exam
    const existingTimetable = await ExamTimetable.findOne({ exam_id });
    if (existingTimetable) {
        res.status(400);
        throw new Error('Exam timetable for this exam already exists.');
    }

    const examTimetable = await ExamTimetable.create({ exam_id, exams });

    if (examTimetable) {
        res.status(201).json(examTimetable);
    } else {
        res.status(400);
        throw new Error('Invalid data for exam timetable.');
    }
});

// Get all Exam Timetables
const getExamTimetables = asyncHandler(async (req, res) => {
    const timetables = await ExamTimetable.find().populate('exam_id',"name").populate('exams.subject_id',"name");
    res.status(200).json(timetables);
});

// Get Exam Timetable by ID
const getExamTimetableById = asyncHandler(async (req, res) => {
    const timetable = await ExamTimetable.findById(req.params.id).populate('exam_id').populate('exams.subject_id');

    if (!timetable) {
        res.status(404);
        throw new Error('Exam Timetable not found.');
    }

    res.status(200).json(timetable);
});

// Update Exam Timetable
const updateExamTimetable = asyncHandler(async (req, res) => {
    const { exam_id, exams } = req.body;

    if (!exam_id || !exams || !Array.isArray(exams) || exams.length === 0) {
        res.status(400);
        throw new Error('Exam ID and a list of exams are required.');
    }

    const timetable = await ExamTimetable.findById(req.params.id);
    if (!timetable) {
        res.status(404);
        throw new Error('Exam Timetable not found.');
    }

    timetable.exam_id = exam_id;
    timetable.exams = exams;
    const updatedTimetable = await timetable.save();

    res.status(200).json(updatedTimetable);
});

// Delete Exam Timetable
const deleteExamTimetable = asyncHandler(async (req, res) => {
    const timetable = await ExamTimetable.findById(req.params.id);

    if (!timetable) {
        res.status(404);
        throw new Error('Exam Timetable not found.');
    }

    await timetable.deleteOne();
    res.status(200).json({ message: 'Exam Timetable deleted successfully.' });
});

// Export all controllers
module.exports = {
    createExamTimetable,
    getExamTimetables,
    getExamTimetableById,
    updateExamTimetable,
    deleteExamTimetable
};
