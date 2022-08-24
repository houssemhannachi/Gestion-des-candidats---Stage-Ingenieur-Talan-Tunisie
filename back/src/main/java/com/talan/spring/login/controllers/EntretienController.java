package com.talan.spring.login.controllers;


import com.talan.spring.login.models.*;
import com.talan.spring.login.payload.dto.*;
import com.talan.spring.login.repository.*;
import com.talan.spring.login.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
                entretienDto.getState(),
                dossierCandidature);
        return entretienService.addEntretien(entretien);
    }

    @GetMapping("/getEntretien/{id}")
    @ResponseBody
    public List<Entretien> getEntretienByIdDossier(@PathVariable("id") int id) {
        return entretienService.getEntretienByIdDossier(id);
    }
    @GetMapping("/getEntretienId/{id}")
    @ResponseBody
    public Entretien getEntretienById(@PathVariable("id") int id) {
        return entretienService.getEntretienById(id);
    }

    @DeleteMapping("/deleteEntretien/{id}")
    public String deleteEntretienById(@PathVariable("id") int id) {
        entretienService.deleteEntretien(id);
        return "Deleted Successfully";
    }

    @PutMapping("/updateState/{id}")
    public void updateState(@PathVariable int id, @RequestBody String newState) {
        entretienService.updateState(id, newState);
    }

}
