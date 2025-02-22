const asyncHandler=require('express-async-handler');
const Invigilator=require('../models/invigilatorModel');
const createInvigilator=asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const existingInvigilator = await Invigilator.findOne({ email });
    if (existingInvigilator) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const newInvigilator = await Invigilator.insertOne({ name, email, password });
    res.status(201).json({ message: "Invigilator created successfully", invigilator: newInvigilator });
});

const getAllInvigilators = asyncHandler(async (req, res) => {
    const invigilators = await Invigilator.find();
    res.status(200).json(invigilators);
});


module.exports={createInvigilator,getAllInvigilators};