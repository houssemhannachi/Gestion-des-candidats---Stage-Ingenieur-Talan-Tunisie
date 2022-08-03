package com.talan.spring.login.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



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
	
	public String titre;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date DateCreation;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date DateValidation;
	
	@Enumerated(EnumType.STRING)
	private State statut;
	
	@ManyToOne
	Candidat candidat;
	
	@ManyToOne
	User user;

	public DossierCandidature(String titre, Candidat candidat) {
		super();
		this.titre = titre;
		this.candidat = candidat;
	}

	
}
