const mongoose=require('mongoose');
const CopySheetsSchema = new mongoose.Schema({
    sheet_no: String,
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }
});

module.exports=mongoose.model("CopySheets", CopySheetsSchema)