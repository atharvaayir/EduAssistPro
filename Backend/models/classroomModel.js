const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Class name field is required"],
            unique: [true, "Please enter a different class name"]
        },
        rows: {
            type: Number,
            required: [true, "Rows field is required"]
        },
        columns: {
            type: Number,
            required: [true, "Columns field is required"]
        },
        benchCapacity: {
            type: Number,
            required: [true, "Bench Capacity field is required"]
        },
        inUse: [
            {
                date: {type: Date,required: [true, "Date is required"] },
                start_time: {type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/},
                end_time: {type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/}
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
