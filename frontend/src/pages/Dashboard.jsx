import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });

  // Load tasks from database on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(user.uid, user.email);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const task = await createTask(newTask, user.uid, user.email);
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "", priority: "medium", status: "todo" });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const updated = await updateTask(id, { status });
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filterTasks = (status) => tasks.filter((t) => t.status === status);

  if (loading) return <div className="loading">Loading your tasks...</div>;

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
                <button onClick={() => updateStatus(task.id, "in_progress")}>Start</button>
                <button onClick={() => handleDelete(task.id)} className="delete">Delete</button>
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
                <button onClick={() => updateStatus(task.id, "done")}>Complete</button>
                <button onClick={() => handleDelete(task.id)} className="delete">Delete</button>
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
                <button onClick={() => handleDelete(task.id)} className="delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}