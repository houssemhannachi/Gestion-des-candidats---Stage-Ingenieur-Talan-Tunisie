package com.talan.spring.login.controllers;

import org.springframework.security.access.prepost.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/all")
    public String allAccess() {
        return "Bienvenue chez Talan Recrutement";
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER') or hasRole('RH') or hasRole('ADMIN')")
    public String userAccess() {
        return "Menu Manager.";
    }

    @GetMapping("/rh")
    @PreAuthorize("hasRole('RH')")
    public String rhAccess() {
        return "Menu Ressources Humaines.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Gestion des rôles";
    }
}
