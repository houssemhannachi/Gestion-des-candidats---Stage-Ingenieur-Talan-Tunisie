package com.talan.spring.login.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
