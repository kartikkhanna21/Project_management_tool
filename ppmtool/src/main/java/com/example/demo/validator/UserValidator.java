package com.example.demo.validator;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.example.demo.domain.User;

import org.springframework.stereotype.Component;

@Component
public class UserValidator implements Validator{
	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return User.class.equals(clazz);
	}
	
	@Override
	public void validate(Object target, Errors errors) {
		// TODO Auto-generated method stub
		User user = (User) target;
		if(user.getPassword().length()<6) {
			errors.rejectValue("password", "Length", "Password must be at least 6 characters");
		}
		if(!user.getPassword().equals(user.getConfirmPassword())) {
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
	}
}

