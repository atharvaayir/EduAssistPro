const asyncHandler = require('express-async-handler');
const Department=require('../models/departmentModel');

// Create a new department
const createDepartment = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Department name is required');
    }

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
        res.status(400);
        throw new Error('Department already exists');
    }

    const department = await Department.create({ name });
    res.status(201).json(department);
});

// Get all departments
const getAllDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();
    res.status(200).json(departments);
});

// Get a single department by ID
const getDepartmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
        res.status(404);
        throw new Error('Department not found');
    }

    res.status(200).json(department);
});

// Update a department
const updateDepartment = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
        res.status(400);
        throw new Error('Department name is required');
    }

    const department = await Department.findById(id);
    if (!department) {
        res.status(404);
        throw new Error('Department not found');
    }

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment && existingDepartment._id.toString() !== id) {
        res.status(400);
        throw new Error('Department with this name already exists');
    }

    department.name = name;
    const updatedDepartment = await department.save();

    res.status(200).json(updatedDepartment);
});

// Delete a department
const deleteDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department) {
        res.status(404);
        throw new Error('Department not found');
    }

    await department.deleteOne();
    res.status(200).json({ message: 'Department deleted successfully' });
});

module.exports={
createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
