package com.talan.spring.login.controllers;

import com.talan.spring.login.models.*;
import com.talan.spring.login.payload.request.*;
import com.talan.spring.login.payload.response.*;
import com.talan.spring.login.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.websocket.server.*;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/test/admin/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public List<User> list() {
        return userRepository.findAll();
    }

    @PostMapping()
    public void save(@RequestBody List<User> users) {
        userRepository.saveAll(users);
    }

    @GetMapping("/user-by-name-and-role/{name}/{role}")
    public List<User> getUserByNameAndRole(@PathVariable("name") String name, @PathVariable("role") ERole role) {
        return userRepository.findByNameContainingIgnoreCaseAndRole_Name(name, role);
    }

}
