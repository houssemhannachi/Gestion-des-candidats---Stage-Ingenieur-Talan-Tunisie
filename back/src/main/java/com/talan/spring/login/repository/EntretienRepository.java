package com.talan.spring.login.repository;

import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Repository

public interface EntretienRepository extends JpaRepository<Entretien, Integer> {
    List<Entretien> findEntretienByDossierCandidature_IdDossier(int id);
}
