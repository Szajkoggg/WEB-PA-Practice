// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  equipment: {
    type: String,
    default: "None",
  },
  present: {
    type: [String],
    default: [""],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
