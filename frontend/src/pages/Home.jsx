import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import { TableVirtuoso } from "react-virtuoso";
import Chance from "chance";

const Home = () => {
  // const handleEdit = (row) => {
  //   console.log("Editing:", row);
  //   alert("Edit feature will go here!");
  // };

  // const handleDelete = (row) => {
  //   console.log("Deleting:", row);
  //   alert("Delete feature will go here!");
  // };

  const chance = new Chance(42);

  function createData(id) {
    return {
      id,
      firstName: chance.first(),
      lastName: chance.last(),
      age: chance.age(),
      phone: chance.phone(),
      state: chance.state({ full: true }),
    };
  }

  const columns = [
    {
      width: 100,
      label: "First Name",
      dataKey: "firstName",
    },
    {
      width: 100,
      label: "Last Name",
      dataKey: "lastName",
    },
    {
      width: 50,
      label: "Age",
      dataKey: "age",
      numeric: true,
    },
    {
      width: 110,
      label: "State",
      dataKey: "state",
    },
    {
      width: 130,
      label: "Phone Number",
      dataKey: "phone",
    },
  ];

  const rows = Array.from({ length: 200 }, (_, index) => createData(index));

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
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

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold">
        Welcome to Student Management System
      </h1>
      <Link to="/AddStudent">
        <button>Add Student</button>
      </Link>

      <Paper style={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
};

export default Home;
