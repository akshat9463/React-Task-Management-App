import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ShowTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`/api/tasks/${id}`).then(res => setTask(res.data));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <Link to="/" className="btn btn-secondary">Back to Dashboard</Link>
    </div>
  );
}
