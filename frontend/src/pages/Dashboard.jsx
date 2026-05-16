import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date().toLocaleDateString(),
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "medium", status: "todo" });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filterTasks = (status) => tasks.filter((t) => t.status === status);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <h1>Task Manager</h1>
        <div className="header-right">
          <span>👋 {user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Add Task Button */}
      <div className="dashboard-actions">
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <form onSubmit={handleAddTask} className="task-form">
          <input
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      )}

      {/* Kanban Board */}
      <div className="kanban">
        {/* Todo Column */}
        <div className="column">
          <h2>📋 Todo ({filterTasks("todo").length})</h2>
          {filterTasks("todo").map((task) => (
            <div key={task.id} className={`task-card priority-${task.priority}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`badge ${task.priority}`}>{task.priority}</span>
              <div className="task-actions">
                <button onClick={() => updateStatus(task.id, "in_progress")}>
                  Start
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="column">
          <h2>⚡ In Progress ({filterTasks("in_progress").length})</h2>
          {filterTasks("in_progress").map((task) => (
            <div key={task.id} className={`task-card priority-${task.priority}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`badge ${task.priority}`}>{task.priority}</span>
              <div className="task-actions">
                <button onClick={() => updateStatus(task.id, "done")}>
                  Complete
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div className="column">
          <h2> Done ({filterTasks("done").length})</h2>
          {filterTasks("done").map((task) => (
            <div key={task.id} className={`task-card priority-${task.priority}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`badge ${task.priority}`}>{task.priority}</span>
              <div className="task-actions">
                <button onClick={() => deleteTask(task.id)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}