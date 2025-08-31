import axios from 'axios';

const API_URL = 'http://localhost:8080/tasks';

export const taskAPI = {
  getAllTasks: () => axios.get(API_URL),
  getTaskById: (id) => axios.get(`${API_URL}/${id}`),
  createTask: (task) => axios.post(API_URL, task),
  updateTask: (id, task) => axios.put(`${API_URL}/${id}`, task),
  deleteTask: (id) => axios.delete(`${API_URL}/${id}`)
};