import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddStudent" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;
