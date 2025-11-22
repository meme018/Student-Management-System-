import { Button, TextField } from "@mui/material";
import React from "react";

const AddStudent = () => {
  return (
    <div className="flex justify-center ">
      <form className="flex justify-center w-3xl p-10 flex-col gap-10">
        <h1>
          Add the Student's name <br />
          <TextField id="outlined-basic" label="Name" variant="outlined" />
        </h1>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Age" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Course Enrolled"
          variant="outlined"
        />
        <button>Confirm</button>
      </form>
    </div>
  );
};

export default AddStudent;
