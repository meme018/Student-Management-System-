require("dotenv").config();
const express = require("express");
const connectDatabase = require("./database");
const Student = require("./model/studentModel");
const cors = require("cors");
const { query, body, validationResult } = require("express-validator");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors());
app.use(express.json());

connectDatabase();

// Validation rules
const studentValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("age").isInt({ min: 1, max: 150 }).withMessage("Valid age is required"),
  body("courseEnrolled").trim().notEmpty().withMessage("Course is required"),
];

const updateValidation = [
  body("name").optional().trim().notEmpty(),
  body("email").optional().trim().isEmail(),
  body("age").optional().isInt({ min: 1, max: 150 }),
  body("courseEnrolled").optional().trim().notEmpty(),
];

// Get all Students
app.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      message: "Students fetched successfully!",
      data: students,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
});

// Create Student
app.post("/student", studentValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  try {
    const { name, email, age, courseEnrolled } = req.body;
    const newStudent = await Student.create({
      name,
      email,
      age,
      courseEnrolled,
    });
    res.status(201).json({
      message: "Student added successfully!",
      data: newStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
});

// Search Student
app.get("/student/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const students = await Student.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { courseEnrolled: { $regex: q, $options: "i" } },
      ],
    });
    res.json({
      message: "Search result fetched successfully",
      data: students,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching students", error: error.message });
  }
});

// Get Student by ID
app.get("/student/:id", async (req, res) => {
  try {
    const singleStudent = await Student.findById(req.params.id);

    if (!singleStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student fetched successfully",
      data: singleStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
});

// Delete Student by ID
app.delete("/student/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
});

// Update Student by ID
app.patch("/student/:id", updateValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  try {
    const { name, email, age, courseEnrolled } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, age, courseEnrolled },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student info updated successfully!",
      data: updatedStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
