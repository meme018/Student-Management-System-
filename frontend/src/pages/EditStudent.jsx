import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useUpdateStudentMutation } from "../services/studentApi";
import { toast } from "react-toastify";

const EditStudent = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const studentData = location.state?.student;

  const [updateStudent] = useUpdateStudentMutation();

  const [formData, setFormData] = useState({
    name: studentData?.name || "",
    email: studentData?.email || "",
    age: studentData?.age || "",
    courseEnrolled: studentData?.courseEnrolled || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent({
        id,
        ...formData,
        age: Number(formData.age),
      }).unwrap();
      toast.success("Student updated successfully!");
      nav("/");
    } catch (err) {
      toast.error("Failed to update student", err.message || "Unknown error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-10">
      <button
        onClick={() => nav("/")}
        className="p-2 h-12 w-40 rounded-xl border text-base font-bold mr-128 hover:bg-[#FDEEDC]"
      >
        Back to Home
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center w-2xl p-10 flex-col gap-10 bg-gray-200 rounded-2xl"
      >
        <h1 className="font-bold text-3xl self-center">Edit student info</h1>
        <subtitle className="text-gray-500">
          <span className="text-red-600 text-2xl">*</span> Please change the
          details below to edit student info.
        </subtitle>
        <TextField
          name="name"
          label="Full Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="age"
          label="Age"
          variant="outlined"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <TextField
          name="courseEnrolled"
          label="Course Enrolled"
          variant="outlined"
          value={formData.courseEnrolled}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="hover:bg-[#94B6D8] bg-[#A7C7E7] p-2 h-12 w-50 rounded-xl text-base font-bold self-end"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
