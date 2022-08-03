package com.talan.spring.login.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.talan.spring.login.models.*;





public interface ICandidatService {


	List<Candidat> listAll();

	Candidat ajouterCandidat(Candidat cdt);

	Candidat getCandidatById(int id);

	void delete(Integer id);


	void updateCandidat(int id,Candidat cdt);

	void AjouterEtAffecterCandidatToDossierCandidature(Candidat cdt, int id);
  

}
