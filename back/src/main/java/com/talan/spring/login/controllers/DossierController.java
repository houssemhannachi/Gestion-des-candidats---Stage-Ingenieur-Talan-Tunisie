package com.talan.spring.login.controllers;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import com.talan.spring.login.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/dossier")
public class DossierController {

    @Autowired
    IDossierService dossierService;
    @Autowired
    DossierCandidatureRepository CandidatRepository;


    @GetMapping("/getAllDossiers")
    public List<DossierCandidature> getAll() {
        return dossierService.findAll();
    }

    @PostMapping("/AddDossier")
    public DossierCandidature ajouterDossier(@RequestBody DossierCandidature d) {
        return dossierService.addDossierCandidature(d);
    }

    @DeleteMapping("/deleteDossier/{id}")
    public String deleteDossierById(@PathVariable("id") int id) {
        dossierService.deleteDossierCandidature(id);
        return "Deleted Successfully";
    }

    @GetMapping("/getdossier/{id}")
    @ResponseBody
    public DossierCandidature getDossierCandidatureById(@PathVariable("id") int id) {
        return dossierService.getDossierCandidatureById(id);

    }

    @PutMapping("/update/{id}")
    public void updateCandidat(@PathVariable int id, @RequestBody DossierCandidature d) {

        dossierService.update(id, d);


    }
}
