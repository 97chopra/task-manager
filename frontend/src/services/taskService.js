import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Get all tasks for a user
export const getTasks = async (firebaseUid, email) => {
  const response = await axios.get(`${API_URL}/tasks/`, {
    params: { firebase_uid: firebaseUid, email: email },
  });
  return response.data;
};

// Create a new task
export const createTask = async (task, firebaseUid, email) => {
  const response = await axios.post(`${API_URL}/tasks/`, task, {
    params: { firebase_uid: firebaseUid, email: email },
  });
  return response.data;
};

// Update a task
export const updateTask = async (taskId, updates) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, updates);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/tasks/${taskId}`);
};