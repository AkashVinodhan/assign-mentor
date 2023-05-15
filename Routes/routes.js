const express = require("express");
const router = require("express").Router();

const { Student, Mentor } = require("../Models/model");

//* Get all students

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", (req, res) => {
  res.send("Home Page");
});

//* Get all mentors

router.get("/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find({});
    res.send(mentors);
  } catch (error) {
    console.log(error);
  }
});

//* Create a student

router.post("/createStudent", async (req, res) => {
  try {
    const { name, rollno } = req.body;
    const student = new Student({ name, rollno });
    await student.save();
    res.status(200).send({ message: "New student created!", data: student });
  } catch (error) {
    console.log(error);
  }
});

//* Create a mentor

router.post("/createMentor", async (req, res) => {
  try {
    const { name, mentor_id } = req.body;
    const mentor = new Mentor({ name, mentor_id });
    await mentor.save();
    res.status(200).send({ message: "New mentor created!", data: mentor });
  } catch (error) {
    console.log(error);
  }
});

//* Assign student(s) to a mentor

router.post("/assign-students", async (req, res) => {
  try {
    const { mentor_id, students } = req.body;
    const mentor = await Mentor.findOne({ mentor_id });
    mentor.students = [...mentor.students, ...students];
    await mentor.save();
    res.send(mentor);
  } catch (error) {
    console.log(error);
  }
});

//* Assign or change mentor of a student

router.post("/assign-mentor", async (req, res) => {
  const { rollno, mentor } = req.body;
  try {
    const student = await Student.findOne({ rollno });
    if (student.mentor) {
      //* if student already had a mentor
      student.previous_mentors.push(student.mentor);
      student.mentor = mentor;
      await student.save();
      res.status(200).send({
        message: "Mentor Changed",
        data: student,
      });
    } else {
      //* if student does not have a mentor
      student.mentor = mentor;
      await student.save();
      res.status(200).send({
        message: "Mentor Assigned",
        data: student,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//* to get all the students of a mentor
router.get("/mentors/:mentor_id", async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const mentor = await Mentor.findOne({ mentor_id }).select({
      name: 1,
      students: 1,
      _id: 0,
    });
    res.send(mentor);
  } catch (error) {
    console.log(error);
  }
});

//* to get previously assignedd mentors for a student
router.get("/students/:rollno/previousMentors", async (req, res) => {
  try {
    const { rollno } = req.params;
    const student = await Student.findOne({ rollno }).select({
      name: 1,
      previous_mentors: 1,
      _id: 0,
    });
    res.send(student);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
