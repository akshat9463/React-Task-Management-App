import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [task, setTask] = useState({ title: "", description: "", status: "Pending" });
  const navigate = useNavigate();

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/tasks", task);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
        <textarea className="form-control mb-2" name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
        <select className="form-select mb-2" name="status" value={task.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit" className="btn btn-success">Add Task</button>
      </form>
    </div>
  );
}
