package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.domain.User;
import com.example.demo.exceptions.UserNameAlreadyExistsException;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			
//			username has to be unique(exception)
			newUser.setUsername(newUser.getUsername());
			newUser.setConfirmPassword("");
			
			return userRepository.save(newUser);
		}
		catch (Exception e) {
			throw new UserNameAlreadyExistsException("Username '"+newUser.getUsername()+"' Already Exists");
		}

	}
}
