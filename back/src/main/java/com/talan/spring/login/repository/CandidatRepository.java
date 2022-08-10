package com.talan.spring.login.repository;


import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Repository
public interface CandidatRepository extends JpaRepository<Candidat, Integer> {
    List<Candidat> findByNomContainingIgnoreCaseAndPrenomContainingIgnoreCase(String nom, String prenom);


}
