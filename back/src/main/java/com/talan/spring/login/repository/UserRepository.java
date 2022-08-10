package com.talan.spring.login.repository;

import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> findByRole_Name(ERole roleName);

    List<User> findByNameContainingIgnoreCaseAndRole_Name(String name, ERole roleName);
}
