package com.talan.spring.login.services;

import com.talan.spring.login.models.*;

import java.util.*;


public interface ICandidatService {


    List<Candidat> listAll();

    List<Candidat> findByName(String nom, String prenom);

    Candidat ajouterCandidat(Candidat cdt);

    Candidat getCandidatById(int id);

    void delete(Integer id);


    void updateCandidat(int id, Candidat cdt);

    long count();


}
