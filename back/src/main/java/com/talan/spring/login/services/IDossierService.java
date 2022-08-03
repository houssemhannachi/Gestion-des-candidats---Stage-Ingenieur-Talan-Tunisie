package com.talan.spring.login.services;

import java.util.List;

import com.talan.spring.login.models.*;





public interface IDossierService {

	List<DossierCandidature> findAll();

	DossierCandidature addDossierCandidature(DossierCandidature dossier);


	void deleteDossierCandidature(int dossierId);

	DossierCandidature getDossierCandidatureById(int id);

	void update(int id, DossierCandidature d);

	

}
