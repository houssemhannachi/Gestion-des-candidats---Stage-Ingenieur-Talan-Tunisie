package com.talan.spring.login.services;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class EntretienServiceImpl implements IEntretienService {

    @Autowired
    EntretienRepository entretienRepository;
    @Autowired
    DossierCandidatureRepository dossierCandidatureRepository;


    @Override
    public Entretien addEntretien(Entretien entretien) {
        return entretienRepository.save(entretien);
    }

    @Override
    public Entretien getEntretienById(int id) {
        return entretienRepository.findById(id).get();
    }

    @Override
    public void deleteEntretien(int id) {
        entretienRepository.deleteById(id);
    }

    @Override
    public void updateState(int id, String newState) {
        Entretien entretien = entretienRepository.findById(id).get();
        entretien.setState(EStateEntretien.valueOf(newState));
        if (EStateEntretien.valueOf(newState).equals(EStateEntretien.REFUSE)) {
            entretien.getDossierCandidature().setStatut(State.En_attente);
        };
        entretienRepository.saveAndFlush(entretien);
        dossierCandidatureRepository.save(entretien.getDossierCandidature());
    }

    @Override
    public List<Entretien> getEntretienByIdDossier(int id) {
        return entretienRepository.findEntretienByDossierCandidature_IdDossier(id);
    }
}
