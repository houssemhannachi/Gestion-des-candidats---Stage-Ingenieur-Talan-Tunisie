package com.talan.spring.login.controllers;


import com.talan.spring.login.models.*;
import com.talan.spring.login.repository.*;
import com.talan.spring.login.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/candidat")
public class CandidatController {

    @Autowired
    ICandidatService candidatService;
    @Autowired
    CandidatRepository CandidatRepository;

    @GetMapping("/getAllcandidat")
    @ResponseBody
    public List<Candidat> getAll() {
        return candidatService.listAll();
    }

    @PostMapping("/Addcandidat")
    @ResponseBody
    public Candidat ajouterCandidat(@RequestBody Candidat cdt) {
        return candidatService.ajouterCandidat(cdt);
    }


    @DeleteMapping("/deleteCandidat/{id}")
    @ResponseBody
    public String deleteCandidatById(@PathVariable("id") int id) {
        candidatService.delete(id);
        return "Deleted Successfully";
    }

    @GetMapping("/getcandidat/{id}")
    @ResponseBody
    public Candidat getCandidatById(@PathVariable("id") int id) {
        return candidatService.getCandidatById(id);
    }

    @PutMapping("/update/{id}")
    public void updateCandidat(@PathVariable int id, @RequestBody Candidat candidat) {
        candidatService.updateCandidat(id, candidat);
    }

    @GetMapping("/candidat-by-name/{nom}/{prenom}")
    public List<Candidat> getCandidatByName(@PathVariable("nom") String nom, @PathVariable("prenom") String prenom) {
        return candidatService.findByName(nom, prenom);
    }

    @GetMapping("/count")
    public long count() {
        return candidatService.count();
    }


}
	