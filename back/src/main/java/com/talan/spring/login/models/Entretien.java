package com.talan.spring.login.models;


import javax.persistence.*;
import java.time.*;
import java.util.*;

@Entity
@Table(name = "entretien")
public class Entretien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private Date dateDebut;

    private Date dateFin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dossier", referencedColumnName = "idDossier")
    private DossierCandidature dossierCandidature;


    public Entretien(String text, Date dateDebut, Date dateFin, DossierCandidature dossierCandidature) {
        this.text = text;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.dossierCandidature = dossierCandidature;
    }

    public Entretien() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public DossierCandidature getDossierCandidature() {
        return dossierCandidature;
    }

    public void setDossierCandidature(DossierCandidature dossierCandidature) {
        this.dossierCandidature = dossierCandidature;
    }


}
