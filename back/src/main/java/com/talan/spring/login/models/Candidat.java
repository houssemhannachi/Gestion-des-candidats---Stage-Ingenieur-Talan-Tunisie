package com.talan.spring.login.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.*;
import java.util.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidat implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCandidat;
    private String nom;
    private String prenom;
    private String email;
    private String mdp;
    private String tel;
    private String photo;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateNaissance = new Date();

    @OneToOne()
    @JoinColumn(name = "file", referencedColumnName = "id")
    private FileDB fileDB;

}


