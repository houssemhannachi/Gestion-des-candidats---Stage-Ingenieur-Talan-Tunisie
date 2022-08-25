package com.talan.spring.login.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.*;
import java.util.*;

@Entity
@Getter
@Setter
public class DossierCandidature implements Serializable {


    /**
     *
     */
    private static final long serialVersionUID = 1L;
    public String intitule;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDossier;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateCreation = new Date(System.currentTimeMillis());

    private String description;

    @Enumerated(EnumType.STRING)
    private State statut = State.valueOf("En_attente");

    @ManyToOne
    @JoinColumn(name = "candidat", referencedColumnName = "idCandidat")
    private Candidat candidat;

    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy="dossierCandidature",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Entretien> entretiens;

    @ManyToOne
    @JoinColumn(name="created_by",referencedColumnName = "id")
    private User createdBy;

    public DossierCandidature(int idDossier) {
        this.idDossier = idDossier;
    }

    public DossierCandidature() {
    }
}
