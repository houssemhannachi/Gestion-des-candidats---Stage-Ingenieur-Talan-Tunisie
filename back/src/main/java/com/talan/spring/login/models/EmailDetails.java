package com.talan.spring.login.models;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
	@AllArgsConstructor
	@NoArgsConstructor
	 
	
	public class EmailDetails {
	 
	    // Class data members
	    private String recipient;
	    private String msgBody;
	    private String subject;
	   
	}


