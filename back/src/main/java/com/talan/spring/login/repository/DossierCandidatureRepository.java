package com.talan.spring.login.repository;


import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface DossierCandidatureRepository extends JpaRepository<DossierCandidature,Integer>{
	

}
