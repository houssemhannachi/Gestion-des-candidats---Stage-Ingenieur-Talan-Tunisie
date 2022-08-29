package com.talan.spring.login.services;

import com.talan.spring.login.models.*;

import java.util.*;


public interface IDossierService {

    List<DossierCandidature> findAll();

    DossierCandidature addDossierCandidature(DossierCandidature dossier);


    void deleteDossierCandidature(int dossierId);

    DossierCandidature getDossierCandidatureById(int id);

    void update(int id, DossierCandidature d);

    void updateState(int id, DossierCandidature d);

    List<DossierCandidature> getDossierCandidatureByManager(long id);
    long count();

    List<DossierCandidature> getDossierByCandidat(int id);
}
