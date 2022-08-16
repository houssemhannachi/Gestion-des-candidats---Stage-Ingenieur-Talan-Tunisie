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

    @Override
    public Entretien addEntretien(Entretien entretien) {
        return entretienRepository.save(entretien);
    }

    @Override
    public List<Entretien> getEntretienById(int id) {
        return entretienRepository.findEntretienByDossierCandidature_IdDossier(id);
    }
}
