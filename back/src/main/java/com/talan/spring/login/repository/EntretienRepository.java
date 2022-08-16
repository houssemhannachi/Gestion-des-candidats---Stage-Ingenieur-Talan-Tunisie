package com.talan.spring.login.repository;

import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

@Repository

public interface EntretienRepository extends JpaRepository<Entretien, Integer> {
}
