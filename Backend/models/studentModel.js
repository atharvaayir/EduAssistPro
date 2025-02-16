const mongoose = require("mongoose");
const studentModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter student name"],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Please enter valid department"],
  },
  rollNo: {
    type: String,
    required: [true, "Please enter roll number"],
  },
  semester: {
    type: Number,
    required: [true, "Please enter semester"],
  },
});
module.exports = mongoose.model("Student", studentModel);
