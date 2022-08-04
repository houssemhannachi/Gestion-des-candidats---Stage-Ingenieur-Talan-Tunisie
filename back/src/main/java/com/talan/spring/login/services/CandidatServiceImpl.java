package com.talan.spring.login.services;

import java.io.IOException;
import java.util.Base64;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;



@Service
@Transactional
public class CandidatServiceImpl implements ICandidatService{
	
	@Autowired
	private CandidatRepository mesCda;
	@Autowired
	DossierCandidatureRepository dossierCandidatureRepository;
	
	
	public List<Candidat> listAll()
	{
		return mesCda.findAll();
	}
	
	@Override
	public Candidat getCandidatById(int id) {
		return mesCda.findById(id).get();
	}
	

	@Override
	public Candidat ajouterCandidat(Candidat cdt) {
		return mesCda.save(cdt);
	}
	
	/*public void  save(MultipartFile file,String nom,String prenom,String email)
	{
		Candidat c = new Candidat();
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		if(fileName.contains(".."))
		{
			System.out.println("not a a valid file");
		}
		try {
			c.setPhoto(Base64.getEncoder().encodeToString(file.getBytes()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		c.setNom(nom);
		
        c.setPrenom(prenom);
        c.setEmail(email);
        
        mesCda.save(c);
	}*/
	
	@Override
	public void updateCandidat(int id,Candidat cdt) {
	    Candidat candidat = mesCda.findById(id).get();
	    
		candidat.setEmail(cdt.getEmail());
		candidat.setMdp(cdt.getMdp());
		candidat.setNom(cdt.getNom());
		candidat.setPrenom(cdt.getPrenom());
		candidat.setTel(cdt.getTel());
		 mesCda.saveAndFlush(candidat);
	}


	@Override
	public void delete(Integer id) {
		mesCda.deleteById(id);
	}
	
	@Override
	public void AjouterEtAffecterCandidatToDossierCandidature(Candidat cdt, int id) {

		Set<DossierCandidature> dossier =(Set<DossierCandidature>) this.dossierCandidatureRepository.findAll().get(id);
		cdt.setDossierCandidatures((List<DossierCandidature>) dossier);
		mesCda.save(cdt);
	
	}
	@Override
	public long count() {
		return mesCda.count();
	}
	
	
}
