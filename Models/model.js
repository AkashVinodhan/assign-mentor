const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollno: Number,
  mentor: String,
  previous_mentors: [String],
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

const mentorSchema = new mongoose.Schema({
  name: String,
  mentor_id: Number,
  students: [String],
});

// Mentor Model
const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = { Student, Mentor };
