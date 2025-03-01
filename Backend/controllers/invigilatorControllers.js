const asyncHandler=require('express-async-handler');
const Invigilator=require('../models/invigilatorModel');
const createInvigilator=asyncHandler(async (req, res) => {
    const { name, email, password,department } = req.body;
    
    const existingInvigilator = await Invigilator.findOne({ email });
    if (existingInvigilator) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const newInvigilator = await Invigilator.insertOne({ name, email, password ,department});
    res.status(201).json({ message: "Invigilator created successfully", invigilator: newInvigilator });
});

const getAllInvigilators = asyncHandler(async (req, res) => {
    const invigilators = await Invigilator.find();
    res.status(200).json(invigilators);
});

const deleteInvigilator=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const inv=await Invigilator.findById(id);
   
    if(!inv){
        res.status(404);
        throw new Error("Invigilator not found");

    }
    const del=await Invigilator.deleteOne(inv);
    if(!del)
    {
        throw new Error("Cannot delete invigilator")
    }
    res.status(200).json({message:"Invigilator successfully deleted"});
});

module.exports={createInvigilator,getAllInvigilators,deleteInvigilator};