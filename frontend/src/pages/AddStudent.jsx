import React, { useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { usePostStudentMutation } from "../services/studentApi.js";

const AddStudent = () => {
  const nav = useNavigate();
  const [postStudent, { isLoading, isError, error, isSuccess }] =
    usePostStudentMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    courseEnrolled: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.age) {
      errors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      errors.age = "Please enter a valid age";
    }

    if (!formData.courseEnrolled.trim()) {
      errors.courseEnrolled = "Course is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Convert age to number before sending
      const studentData = {
        ...formData,
        age: parseInt(formData.age, 10),
      };

      await postStudent(studentData).unwrap();

      // Show success message
      alert("Student added successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        age: "",
        courseEnrolled: "",
      });

      // Navigate back to home after a short delay
      setTimeout(() => {
        nav("/");
      }, 1000);
    } catch (err) {
      console.error("Failed to add student:", err);
      alert(
        `Failed to add student: ${
          err.data?.message || err.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-10 py-10">
      <button
        onClick={() => nav("/")}
        className="p-2 h-12 w-40 rounded-xl border text-base font-bold mr-auto ml-10 hover:bg-[#FDEEDC]"
      >
        Back to Home
      </button>

      <div className="flex justify-center w-full max-w-2xl p-10 flex-col gap-6 bg-gray-200 rounded-2xl">
        <h1 className="font-bold text-3xl self-center">Add New Student</h1>

        <p className="text-gray-500">
          <span className="text-red-600 text-2xl">*</span> Please fill in the
          details below to add a new student.
        </p>

        <TextField
          name="name"
          label="Full Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
          required
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
          required
          fullWidth
        />

        <TextField
          name="age"
          label="Age"
          variant="outlined"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={!!formErrors.age}
          helperText={formErrors.age}
          required
          fullWidth
        />

        <TextField
          name="courseEnrolled"
          label="Course Enrolled"
          variant="outlined"
          value={formData.courseEnrolled}
          onChange={handleChange}
          error={!!formErrors.courseEnrolled}
          helperText={formErrors.courseEnrolled}
          required
          fullWidth
        />

        {isError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Error:{" "}
            {error?.data?.message || error?.message || "Failed to add student"}
          </div>
        )}

        {isSuccess && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Student added successfully!
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="hover:bg-[#94B6D8] bg-[#A7C7E7] p-2 h-12 w-32 rounded-xl text-base font-bold self-end disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <CircularProgress size={24} /> : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
