const mongoose=require('mongoose');
const ExamTimetableSchema = new mongoose.Schema({
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam',unique:[true,"Exam timetable already exists"] },
    exams: [{
        subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        classroom_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
        invigilator_id:{type:mongoose.Schema.Types.ObjectId,ref:'Invigilator'},
        exam_date: {type:Date,required:[true,"Please enter exam date"]},
        start_time: {type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/},
        end_time: {type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/}
    }]
});


module.exports= mongoose.model('ExamTimetable', ExamTimetableSchema);