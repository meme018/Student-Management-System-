require("dotenv").config();
const express = require("express");
const connectDatabase = require("./database");
const Student = require("./model/studentModel");
const cors = require("cors");

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

// Get all Students
app.get("/student", async (req, res) => {
  const students = await Student.find();
  res.json({
    message: "Product fetched successfullly!",
    data: students,
  });
});

// Create Student
app.post("/student", (req, res) => {
  console.log(req.body);

  const { name, email, age, courseEnrolled } = req.body;

  Student.create({ name, email, age, courseEnrolled });

  res.json({
    message: "Student added successfully!",
    data: req.body,
  });
});

// Search Student
app.get("/student/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json({
      message: "Student not found",
    });
  }

  try {
    const student = await Student.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { courseEnrolled: { $regex: q, $options: "i" } },
      ],
    });
    res.json({
      message: "Search result fetched successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for students",
      error: error.message,
    });
  }
});

// Get Student by ID
app.get("/student/:id", async (req, res) => {
  const { id } = req.params;
  const singleStudent = await Student.findById(id);

  if (!singleStudent || !id) {
    return res.json({
      message: "Student not found",
    });
  }
  res.json({
    message: "Get student by ID successful",
    data: singleStudent,
  });
});

// Delete Student by ID
app.delete("/student/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({
    message: "Student deleted successfully",
  });
});

// update Student by ID
app.patch("/student/:id", async (req, res) => {
  const { id } = req.params;

  const { name, email, age, courseEnrolled } = req.body;

  await Student.findByIdAndUpdate(id, { name, email, age, courseEnrolled });

  res.json({
    message: "Student info updated successfully!!",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servet stated on port 3000");
});
