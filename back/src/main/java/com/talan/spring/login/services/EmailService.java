package com.talan.spring.login.services;

import com.talan.spring.login.models.EmailDetails;

public interface EmailService {
	
    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);
 

}
