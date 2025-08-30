package com.ibolt.todoapi.service;

import com.ibolt.todoapi.entity.Task;
import com.ibolt.todoapi.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Criar tarefa
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Listar todas as tarefas
    public List<Task> getAllTasks() {
        return taskRepository.findAllOrderByCreatedAtDesc();
    }

    // Buscar tarefa por ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Atualizar tarefa
    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setCompleted(taskDetails.getCompleted());
            return taskRepository.save(task);
        }
        
        return null; // Ou lançar exceção personalizada
    }

    // Deletar tarefa
    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Buscar por status
    public List<Task> getTasksByStatus(Boolean completed) {
        return taskRepository.findByCompleted(completed);
    }

    // Contar tarefas
    public long countTasks() {
        return taskRepository.count();
    }
}