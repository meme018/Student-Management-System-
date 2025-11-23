import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { TableVirtuoso } from "react-virtuoso";
import { useGetStudentsQuery } from "../services/studentApi";

const Home = () => {
  const nav = useNavigate();
  const { data: students, error, isLoading } = useGetStudentsQuery();

  const columns = [
    {
      width: 70,
      label: "Full Name",
      dataKey: "fullName",
    },
    {
      width: 50,
      label: "Age",
      dataKey: "age",
      numeric: true,
    },
    {
      width: 200,
      label: "Email",
      dataKey: "email",
    },
    {
      width: 100,
      label: "Course Enrolled",
      dataKey: "courseEnrolled",
    },
    {
      width: 70,
      label: "Actions",
      dataKey: "actions",
    },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          "& th": {
            backgroundColor: "#FDEEDC",
            color: "#4B5563",
            fontWeight: "600",
            fontSize: "15px",
            borderBottom: "2px solid #E8E8E8",
          },
          "& td": {
            color: "#4B5563",
            fontSize: "14px",
            padding: "10px",
            borderBottom: "1px solid #E8E8E8",
          },
          "& tr:hover td": {
            backgroundColor: "#FFF6F1",
          },
        }}
      />
    ),
    TableHead: React.forwardRef((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  const handleEdit = (row) => {
    console.log("Editing:", row);
    alert(`Editing student: ${row.fullName}`);
  };

  const handleDelete = (row) => {
    console.log("Deleting:", row);
    alert(`Deleting student: ${row.fullName}`);
  };

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {column.dataKey === "actions" ? (
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(row)}
                  className="px-3 py-1 rounded-lg text-sm font-medium bg-[#A7C7E7] text-gray-700 hover:bg-[#94B6D8] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row)}
                  className="px-3 py-1 rounded-lg text-sm font-medium bg-[#F7A8B8] text-gray-700 hover:bg-[#E799A8] transition"
                >
                  Delete
                </button>
              </div>
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">
        Welcome to Student Management System
      </h1>

      <div className="flex flex-row items-center gap-6 w-full max-w-5xl">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative flex w-full items-center rounded-xl border border-black bg-white shadow-md">
            <svg
              className="absolute left-3 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              name="search"
              className="w-full h-14 pl-12 pr-40 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Search student by name, course..."
            />

            <button
              onClick={(e) => e.preventDefault()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-11 px-6 bg-[#A7C7E7] text-gray-700 font-medium rounded-lg hover:bg-[#94B6D8] transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Add Student Button */}
        <button
          onClick={() => nav("/AddStudent")}
          className="h-12 w-40 rounded-xl text-base border-2 font-bold hover:bg-[#FDEEDC]"
        >
          Add Student
        </button>
      </div>

      {/* Table */}
      <Paper
        className="mt-10 w-full max-w-5xl shadow-lg rounded-2xl border"
        style={{ height: 420 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-600 text-lg">
              Error loading students: {error.message || "Something went wrong"}
            </p>
          </div>
        ) : students && students.length > 0 ? (
          <TableVirtuoso
            data={students}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-lg">No students found</p>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Home;
