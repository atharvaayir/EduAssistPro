const mongoose=require('mongoose');
const ExamTimetableSchema = new mongoose.Schema({
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    exams: [{
        subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        classroom_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
        exam_date: Date,
        start_time: {type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/},
        end_time: {type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/}
    }]
});

module.exports= mongoose.model('ExamTimetable', ExamTimetableSchema);