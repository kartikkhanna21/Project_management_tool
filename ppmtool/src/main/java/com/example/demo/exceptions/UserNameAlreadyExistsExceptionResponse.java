package com.example.demo.exceptions;

public class UserNameAlreadyExistsExceptionResponse {
	private String username;
	public UserNameAlreadyExistsExceptionResponse(String username) {
		// TODO Auto-generated constructor stub
		this.username=username;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
