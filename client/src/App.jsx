import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./Dashboard";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import ShowTask from "./ShowTask";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/task/:id" element={<ShowTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
