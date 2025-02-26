const mongoose = require("mongoose");

const SeatAllocationSchema = new mongoose.Schema({
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true ,unique:[true,"Seats already allocated"]},
    allocations: [
        {
            subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
            classrooms: [
                {
                    classroom_id: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
                    invigilator_id: { type: mongoose.Schema.Types.ObjectId, ref: "Invigilator" },
                    allocated_seats: [
                        {
                            student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
                            seat_position: { row: Number, column: Number },
                        }
                    ]
                }
            ]
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("SeatAllocation", SeatAllocationSchema);
