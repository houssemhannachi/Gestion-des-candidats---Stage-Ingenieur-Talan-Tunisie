package com.talan.spring.login.controllers;


import com.talan.spring.login.models.*;
import com.talan.spring.login.payload.dto.*;
import com.talan.spring.login.repository.*;
import com.talan.spring.login.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*")
@RestController
@RequestMapping("/api/entretien")
public class EntretienController {

    @Autowired
    IEntretienService entretienService;
    @Autowired
    EntretienRepository entretienRepository;

    @PostMapping("/AddEntretien")
    public Entretien ajouterEntretien(@RequestBody EntretienDto entretienDto) {
        DossierCandidature dossierCandidature = new DossierCandidature(entretienDto.getIdDossier());
        Entretien entretien = new Entretien(entretienDto.getData().getText(),
                entretienDto.getData().getStart(),
                entretienDto.getData().getEnd(),
                dossierCandidature);
        return entretienService.addEntretien(entretien);
    }

}
