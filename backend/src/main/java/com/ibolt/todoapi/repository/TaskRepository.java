package com.ibolt.todoapi.repository;

import com.ibolt.todoapi.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Métodos automáticos do JpaRepository:
    // save(), findAll(), findById(), deleteById(), count()
    
    // Métodos personalizados (opcionais)
    List<Task> findByCompleted(Boolean completed);
    
    @Query("SELECT t FROM Task t ORDER BY t.createdAt DESC")
    List<Task> findAllOrderByCreatedAtDesc();
}