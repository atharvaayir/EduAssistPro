const mongoose = require("mongoose");
const subjectModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter student name"],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Please enter valid department"],
  },
  code: {
    type: String,
    required: [true, "Please enter subject code"],
  },
  semester: {
    type: Number,
    required: [true, "Please enter semester"],
  },
});
module.exports = mongoose.model("Subject", subjectModel);
