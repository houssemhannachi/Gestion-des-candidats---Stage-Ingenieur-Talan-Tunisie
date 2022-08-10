package com.talan.spring.login.services;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import javax.transaction.*;
import java.util.*;


@Service
@Transactional
public class CandidatServiceImpl implements ICandidatService {

    @Autowired
    DossierCandidatureRepository dossierCandidatureRepository;
    @Autowired
    private CandidatRepository mesCda;

    public List<Candidat> listAll() {
        return mesCda.findAll();
    }

    @Override
    public List<Candidat> findByName(String nom, String prenom) {
        return mesCda.findByNomContainingIgnoreCaseAndPrenomContainingIgnoreCase(nom, prenom);
    }

    @Override
    public Candidat getCandidatById(int id) {
        return mesCda.findById(id).get();
    }


    @Override
    public Candidat ajouterCandidat(Candidat cdt) {
        return mesCda.save(cdt);
    }


    @Override
    public void updateCandidat(int id, Candidat cdt) {
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
    public long count() {
        return mesCda.count();
    }


}
