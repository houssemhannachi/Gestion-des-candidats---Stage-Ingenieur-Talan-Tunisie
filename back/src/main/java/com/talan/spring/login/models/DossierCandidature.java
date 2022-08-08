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
	
	private String titre;
	
	private String description;
	@Enumerated(EnumType.STRING)
	private State statut;
	
	

	@ManyToOne
	@JoinColumn(name = "candidat", referencedColumnName = "id_candidat")
	private Candidat candidat;

	@ManyToOne
	@JoinColumn(name = "user", referencedColumnName = "id")
	private User user;

	public DossierCandidature(String titre) {
		super();
		this.titre = titre;
	}

	
}
