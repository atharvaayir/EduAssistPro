const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter student name"],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Please enter valid department"],
  },
  rollno: {
    type: String,
    required: [true, "Please enter roll number"],
  },
  semester: {
    type: Number,
    required: [true, "Please enter semester"],
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
