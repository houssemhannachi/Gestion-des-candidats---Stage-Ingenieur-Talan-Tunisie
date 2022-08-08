package com.talan.spring.login.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.talan.spring.login.models.*;





public interface ICandidatService {


	List<Candidat> listAll();

	List<Candidat> findByName(String nom,String prenom);

	Candidat ajouterCandidat(Candidat cdt);

	Candidat getCandidatById(int id);

	void delete(Integer id);


	void updateCandidat(int id,Candidat cdt);

	long count();
  

}
