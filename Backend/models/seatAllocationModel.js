const mongoose = require("mongoose");

const SeatAllocationSchema = new mongoose.Schema({
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    allocations: [
        {
            subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
            classroom_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true }],
            invigilator_id: { type: mongoose.Schema.Types.ObjectId, ref: "Invigilator", required: true },
            allocated_seats: [
                {
                    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
                    seat_position: { row: Number, column: Number },
                }
            ]
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("SeatAllocation", SeatAllocationSchema);
