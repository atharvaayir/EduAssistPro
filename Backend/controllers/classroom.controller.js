const { mongoose } = require("mongoose");
const classroomModel = require("../models/classroomModel");

const allClassroomsHandler = async (req, res) => {
  const classrooms = await classroomModel.find({});
  return res.status(200).json(classrooms);
};

const createClassroomHandler = async (req, res) => {
  console.log("body = ",req.body);
    
  const { name, rows, columns, benchCapacity } = req.body;
  if (!name || !rows || !columns || !benchCapacity)
    return res.status(400).json({ message: "All the fields are required." });

  // check for existence of the classname
  const classroom = await classroomModel.findOne({ name });
  if (classroom){
      console.log("Object already exists");
      return res.status(400).json({ message: "Use different name" });
  }

  // create new classroom
  const newClassroom = new classroomModel({ name, rows, columns, benchCapacity });
  const result = await newClassroom.save();
  console.log("classroom created\n",result);
  
  return res.status(201).json({ message: "Object Created" });
};

const deleteClassroomHandler = async (req, res) => {
  const { id: classroomId } = req.params;
  console.log(classroomId);
  

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(classroomId)) 
    return res.status(400).json({ message: "Invalid Request | No object deleted" });

  // Check if the classroom exists and delete
  const result = await classroomModel.deleteOne({_id: classroomId});
  if (result.deletedCount !== 1) 
    return res.status(400).json({ message: "Invalid Request | No object deleted" });

  return res.status(200).json({ message: "Object deleted successfully" });
};

const updateClassroomHandler = async (req, res) => {
  const { id: classroomId } = req.params;
  const { name, rows, columns, benchCapacity } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(classroomId)) 
    return res.status(400).json({ message: "Invalid Request | Invalid object ID" });

  if (!name || !rows || !columns || !benchCapacity)
    return res.status(400).json({ message: "All the fields are required." });
  console.log(name);
  
  const classrooms = await classroomModel.find({ name });
  console.log(classrooms.length);
  if (classrooms.length>1){
      console.log("Object already exists");
      return res.status(400).json({ message: "Use different name" });
  }

  const classroom = await classroomModel.findByIdAndUpdate(
        classroomId,
        {name,rows,columns,benchCapacity},
        {new:true} //Returns the updated object
    );

  if (!classroom) 
    return res.status(404).json({ message: "Classroom not found" });

  return res.status(200).json({ message: "Classroom updated", classroom });
  
};

const singleClassroomDetailsHandler = async(req,res)=>{
    const { id } = req.params;
    

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ message: "Invalid Request | No object deleted" });

    // Check if the document exists and return
    const result = await classroomModel.findOne({_id: id});
    if (!result) 
        return res.status(400).json({ message: "Invalid Request | No object found" });
    return res.status(200).json(result);
};

module.exports = { allClassroomsHandler, createClassroomHandler, deleteClassroomHandler, updateClassroomHandler, singleClassroomDetailsHandler };
