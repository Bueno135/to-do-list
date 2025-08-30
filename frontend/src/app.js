import React, { useState, useEffect } from 'react';
import { taskAPI } from './services/api';
import 'app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      alert('Erro ao carregar tarefas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      await taskAPI.createTask(newTask);
      setNewTask({ title: '', description: '' });
      loadTasks();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
      await taskAPI.deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa');
    }
  };

  const toggleCompleted = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await taskAPI.updateTask(task.id, updatedTask);
      loadTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List - Desafio iBolt</h1>
        
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Título da tarefa"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Descrição (opcional)"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          />
          <button type="submit">Adicionar Tarefa</button>
        </form>

        <div className="tasks-container">
          <h2>Minhas Tarefas ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p>Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>
          ) : (
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <small>Criada em: {new Date(task.createdAt).toLocaleDateString()}</small>
                  </div>
                  <div className="task-actions">
                    <button 
                      onClick={() => toggleCompleted(task)}
                      className={task.completed ? 'btn-pending' : 'btn-complete'}
                    >
                      {task.completed ? 'Marcar Pendente' : 'Concluir'}
                    </button>
                    <button 
                      onClick={() => handleDelete(task.id)} 
                      className="btn-delete"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;