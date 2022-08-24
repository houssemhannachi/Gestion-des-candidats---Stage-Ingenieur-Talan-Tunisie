package com.talan.spring.login.services;

import com.talan.spring.login.models.*;

import java.util.*;

public interface IEntretienService {

    Entretien addEntretien(Entretien entretien);

    Entretien getEntretienById(int id);

    void deleteEntretien(int id);

    void updateState(int id, String newState);

    List<Entretien> getEntretienByIdDossier(int id);
}
