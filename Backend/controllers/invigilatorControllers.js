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

const authenticateInvigilator=asyncHandler(async(req,res)=>{
    console.log("new request");
    const {email,password}=req.body;
    if(!email || !password){
       return res.status(400).json({message:"Input fields are empty"});
    }
    const inv=await Invigilator.findOne({email});
    if(!inv){
        return res.status(400).json({message:"Authentication failed"});
    }
    if(inv.password===password){
        await inv.populate("department");
        const {name,email,department,assignedExams}=inv;
       return res.status(200).json({name,email,department,assignedExams});
    }
    
    return res.status(400).json({message:"Authentication failed"});
});
module.exports={createInvigilator,getAllInvigilators,deleteInvigilator,authenticateInvigilator};