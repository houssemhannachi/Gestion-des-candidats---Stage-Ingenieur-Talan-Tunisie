package com.talan.spring.login.repository;


import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
public interface CandidatRepository extends JpaRepository<Candidat,Integer> {
    List<Candidat> findByNomContainingIgnoreCaseAndPrenomContainingIgnoreCase(String nom,String prenom);
	
 	

}
