package com.talan.spring.login.services;

import com.talan.spring.login.models.*;

public interface IEntretienService {

    Entretien addEntretien(Entretien entretien);

    Entretien getEntretienById(int id);
}
