const mongoose = require("mongoose");
const invigilatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the invigilator"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    department:{
        type:mongoose.Types.ObjectId,
        ref:"Subject",
        required:[true,"Please enter department"]
    },
    assignedExams: [
        {
            exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
            subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
            classroom_id: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },
            exam_date: { type: Date, required: true },
            start_time: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
            end_time: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("Invigilator", invigilatorSchema);
