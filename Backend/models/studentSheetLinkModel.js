const mongoose = require("mongoose");
const studentSheetLinkSchema = new mongoose.Schema({
  sheet_no: { type: mongoose.Schema.Types.ObjectId, ref: "CopySheets" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
});

module.exports = mongoose.model("StudentSheetLink", studentSheetLinkSchema);
