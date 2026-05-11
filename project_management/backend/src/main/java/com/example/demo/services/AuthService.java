package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.models.UserModel;

@Service
public class AuthService {

	@Autowired
	UserService service;
	
	@Autowired
	PasswordEncoder passwordEncoder; 

	public UserModel registerUser(UserModel model) {
		model.setPassword(passwordEncoder.encode(model.getPassword()));
		return service.createUser(model);
	}
}
