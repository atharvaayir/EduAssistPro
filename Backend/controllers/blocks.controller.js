const { mongoose } = require("mongoose");
const blocksModel = require("../models/blockModel");

const allBlocksHandler = async (req,res)=>{
    const blocks = await blocksModel.find({});
    return res.status(200).json(blocks);
}

const singleBlockDetailsHandler = async (req,res)=>{
    const { id } = req.params;    
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ message: "Invalid Request | No object deleted" });

    // Check if the document exists and return
    const result = await blocksModel.findOne({_id: id});
    if (!result) 
        return res.status(400).json({ message: "Invalid Request | No object found" });
    return res.status(200).json(result);
}

const createBlockHandler = async (req,res)=>{
    const {name,classrooms} = req.body;
    console.log(name,classrooms);
    
    if(!name||!classrooms){
        return res.status(400).json({ message: "All the fields are required." });
    }

    const block = await blocksModel.findOne({name});
    if(block){
        console.log("Block already exists");
      return res.status(400).json({ message: "Use different name" });
    }

    // create new block
      const newBlock = new blocksModel({ name, classrooms });
      const result = await newBlock.save();
      console.log("classroom created\n",result);
      
      return res.status(201).json({ message: "Block Created" });
}

const deleteBlockHandler = async (req,res) => {
    const { id } = req.params;
    
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ message: "Invalid Request | No block deleted" });
    
      // Check if the block exists and delete
      const result = await blocksModel.deleteOne({_id: id});
      if (result.deletedCount !== 1) 
        return res.status(400).json({ message: "Invalid Request | No block deleted" });
    
      return res.status(200).json({ message: "block deleted successfully" });
}

const updateBlockHandler = async (req,res) => {
    const {id} = req.params;
    const {name,classrooms} = req.body;

    // Validate Id
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ message: "Invalid Request | Invalid object ID" });

    if(!name||!classrooms){
        return res.status(400).json({ message: "All the fields are required." });
    }

    const blocks = await blocksModel.find({ name });
      if (blocks.length>1){
          console.log("Object already exists");
          return res.status(400).json({ message: "Use different name" });
      }

    const classroom = await blocksModel.findByIdAndUpdate(
        id,
        {name,classrooms},
        {new:true} //Returns the updated object
    );
    
    if (!classroom) 
        return res.status(404).json({ message: "Classroom not found" });
    
    return res.status(200).json({ message: "Classroom updated", classroom });
    
}

module.exports = {  allBlocksHandler,
                    singleBlockDetailsHandler,
                    createBlockHandler,
                    deleteBlockHandler,
                    updateBlockHandler};