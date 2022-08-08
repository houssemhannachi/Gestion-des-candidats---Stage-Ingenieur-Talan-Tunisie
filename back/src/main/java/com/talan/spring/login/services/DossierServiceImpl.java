package com.talan.spring.login.services;


import java.util.Calendar;
import java.util.List;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class  DossierServiceImpl implements IDossierService {

	@Autowired
	DossierCandidatureRepository dossierCandidatureRepository;
	@Autowired
	CandidatRepository candidatRepository;

	@Override
	public List<DossierCandidature> findAll() {
		return dossierCandidatureRepository.findAll();
	}

	@Override
	public DossierCandidature getDossierCandidatureById(int id) {
		return dossierCandidatureRepository.findById(id).get();
	}

	@Override
	public DossierCandidature addDossierCandidature(DossierCandidature dc) {
			return dossierCandidatureRepository.save(dc);
	}

	@Override
	public void update(int id,DossierCandidature d) {
		DossierCandidature dossier = dossierCandidatureRepository.findById(id).get();
	    
		dossier.setIntitule(d.getIntitule());
		dossier.setDateCreation(d.getDateCreation());
		dossier.setDateValidation(d.getDateValidation());
		dossier.setStatut(d.getStatut());
		dossierCandidatureRepository.saveAndFlush(dossier);
	}


	
	 @Override
	    public void deleteDossierCandidature(int id) {
	      dossierCandidatureRepository.deleteById(id);
	    }
}
