package com.talan.spring.login.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;
import com.talan.spring.login.models.EmailDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;

import javax.mail.internet.*;


@Service
public class EmailServiceImpl implements EmailService {

 @Autowired 
 private JavaMailSender javaMailSender;

 @Value("${spring.mail.username}") 
 private String sender;

 // Method 1
 // To send a simple email
 public String sendSimpleMail(EmailDetails details)
 {

     // Try block to check for exceptions
     try {
         MimeMessage mimeMessage = javaMailSender.createMimeMessage();
         MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
         mimeMessage.setContent(details.getMsgBody(), "text/html");

         // Setting up necessary details
         helper.setFrom(sender);
         helper.setTo(details.getRecipient());
         helper.setText(details.getMsgBody(),true);
         helper.setSubject(details.getSubject());

         // Sending the mail
         javaMailSender.send(mimeMessage);
         return "Mail Sent Successfully...";
     }

     // Catch block to handle the exceptions
     catch (Exception e) {
         return "Error while Sending Mail";
     }
 }
}
