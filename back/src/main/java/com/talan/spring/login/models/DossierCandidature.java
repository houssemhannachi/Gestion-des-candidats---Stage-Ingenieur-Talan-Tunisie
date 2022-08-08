package com.talan.spring.login.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DossierCandidature implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_dossier; 
	
	public String intitule;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date DateCreation = new Date(System.currentTimeMillis());
	
	private String description;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date DateValidation;

	@Enumerated(EnumType.STRING)
	private State statut = State.valueOf("En_attente");

	@ManyToOne
	@JoinColumn(name = "candidat", referencedColumnName = "id_candidat")
	private Candidat candidat;

	@ManyToOne
	@JoinColumn(name = "user", referencedColumnName = "id")
	private User user;

	public DossierCandidature(int id_dossier, String intitule) {
		this.id_dossier = id_dossier;
		this.intitule = intitule;
	}

	
}
