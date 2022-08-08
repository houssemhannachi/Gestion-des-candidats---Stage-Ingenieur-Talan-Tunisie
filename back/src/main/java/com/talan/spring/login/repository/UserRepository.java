package com.talan.spring.login.repository;

import java.util.*;

import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> findByRole_Name(String roleName);

    List<User> findByNameContainingIgnoreCaseAndRole_Name(String name, ERole roleName);
}
