import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:8080/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Task Dashboard</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add Task</Link>
      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-4 mb-3" key={task._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <span className={`badge text-bg-${task.status === "Completed" ? "success" : task.status === "In Progress" ? "primary" : "secondary"}`}>
                  {task.status}
                </span>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Link to={`/task/${task._id}`} className="btn btn-info btn-sm">View</Link>
                <Link to={`/edit/${task._id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button onClick={() => deleteTask(task._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
