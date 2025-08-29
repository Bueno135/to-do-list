package com.ibolt.todoapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    
    @GetMapping("/")
    public String home() {
        return "✅ To-Do API está funcionando! Projeto iBolt em desenvolvimento.";
    }
    
    @GetMapping("/status")
    public String status() {
        return "🚀 API Online - Spring Boot + MySQL funcionando!";
    }
}