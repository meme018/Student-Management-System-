import React from "react";
import { useNavigate } from "react-router";

const EditStudent = () => {
  const nav = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-10 ">
      <button
        onClick={() => nav("/")}
        className="p-2  h-12 w-40 rounded-xl border text-base font-bold mr-128  hover:bg-[#FDEEDC] "
      >
        Back to Home
      </button>
      <form className="flex justify-center w-2xl p-10 flex-col gap-10 bg-gray-200 rounded-2xl ">
        <h1 className="font-bold text-3xl self-center">Edit student info</h1>
        <subtitle className="text-gray-500">
          <span className="text-red-600 text-2xl">*</span> Please change in the
          details below to edit student info.
        </subtitle>
        <TextField id="outlined-basic" label="Full Name" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Age" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Course Enrolled"
          variant="outlined"
        />
        <button className="hover:bg-[#94B6D8] bg-[#A7C7E7] p-2  h-12 w-50 rounded-xl text-base font-bold self-end">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
