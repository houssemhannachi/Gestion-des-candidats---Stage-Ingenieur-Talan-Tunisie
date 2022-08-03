package com.talan.spring.login.controllers;

import java.util.List;

import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import com.talan.spring.login.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


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
