package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserNameAlreadyExistsException extends RuntimeException {

	public UserNameAlreadyExistsException(String message) {
		// TODO Auto-generated constructor stub
		super(message);
	}	
}
