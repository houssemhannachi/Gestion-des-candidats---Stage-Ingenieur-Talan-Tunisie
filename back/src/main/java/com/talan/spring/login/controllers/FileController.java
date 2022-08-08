package com.talan.spring.login.controllers;


import java.io.InputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/fileUpload")
@CrossOrigin(origins = "http://localhost:4200")
public class FileController 
{
	
	private static Logger logger = LoggerFactory.getLogger(FileController.class);
	
    
	@PostMapping("/upload")
	public ResponseEntity<String> uploadData(@RequestParam("file") MultipartFile file) throws Exception {
		if (file == null) {
			throw new RuntimeException("You must select the a file for uploading");
		}
		InputStream inputStream = file.getInputStream();
		String originalName = file.getOriginalFilename();
		String name = file.getName();
		String contentType = file.getContentType();
		long size = file.getSize();
		logger.info("inputStream: " + inputStream);
		logger.info("originalName: " + originalName);
		logger.info("name: " + name);
		logger.info("contentType: " + contentType);
		logger.info("size: " + size);
		// Do processing with uploaded file data in Service layer
		return new ResponseEntity<String>(originalName, HttpStatus.OK);
	}
	}
    
