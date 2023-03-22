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
  startingdate: {
    type: String,
    default: Date.now,
  },
  salary: {
    current: { type: Number, default: 350000 },
    desired: { type: Number, default: 350000 },
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
