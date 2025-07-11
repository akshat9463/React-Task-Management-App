const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  priority:    { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  dueDate:     { type: Date },
//   createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
