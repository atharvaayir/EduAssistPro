const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the subject name"],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Please enter a valid department"],
  },
  code: {
    type: String,
    required: [true, "Please enter the subject code"],
    unique: [true, "Subject code must be unique"],
  },
  semester: {
    type: Number,
    required: [true, "Please enter the semester"],
  }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
