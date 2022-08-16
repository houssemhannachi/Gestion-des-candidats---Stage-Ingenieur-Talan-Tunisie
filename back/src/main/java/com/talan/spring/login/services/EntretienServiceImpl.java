package com.talan.spring.login.services;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class EntretienServiceImpl implements IEntretienService {

    @Autowired
    EntretienRepository entretienRepository;

    @Override
    public Entretien addEntretien(Entretien entretien) {
        return entretienRepository.save(entretien);
    }

    @Override
    public Entretien getEntretienById(int id) {
        return entretienRepository.findById(id).get();
    }
}
