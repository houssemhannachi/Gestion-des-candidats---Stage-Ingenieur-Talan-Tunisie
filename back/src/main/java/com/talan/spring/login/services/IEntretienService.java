package com.talan.spring.login.services;

import com.talan.spring.login.models.*;

import java.util.*;

public interface IEntretienService {

    Entretien addEntretien(Entretien entretien);

    List<Entretien> getEntretienById(int id);

}
