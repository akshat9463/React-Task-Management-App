import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditTask() {
  const [task, setTask] = useState({ title: "", description: "", status: "Pending" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/tasks/${id}`).then(res => setTask(res.data));
  }, [id]);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/tasks/${id}`, task);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" name="title" value={task.title} onChange={handleChange} />
        <textarea className="form-control mb-2" name="description" value={task.description} onChange={handleChange} />
        <select className="form-select mb-2" name="status" value={task.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
}
