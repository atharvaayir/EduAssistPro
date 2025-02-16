const mongoose = require("mongoose");
const departmentModel = mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Please enter a unique department name"],
    required: [true, "Please enter department name"],
  },
});

module.exports = mongoose.model("Department", departmentModel);
