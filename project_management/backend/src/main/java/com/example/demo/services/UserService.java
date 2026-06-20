package com.example.demo.services;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.config.AppConstants;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.Provider;
import com.example.demo.models.Role;
import com.example.demo.models.UserModel;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepo;

	// create new User
	public UserModel createUser(UserModel user) {
		if (user.getEmail() == null || user.getEmail().isBlank()) {
			throw new IllegalArgumentException("Email is required");

		}
		if(userRepository.findByEmail(user.getEmail()).isPresent()) {
		    throw new IllegalArgumentException("User with given mail already exists..");
		}

		user.setProvider(user.getProvider() != null ? user.getProvider() : Provider.LOCAL);
		
		//assign roles here
		//assign the default role
		Role role  = roleRepo.findByName("ROLE_"+AppConstants.GUEST_ROLE).orElse(null);
		user.getRoles().add(role);

		return userRepository.save(user);
	}

	// Get All user
	public Iterable<UserModel> getAllUsers() {
		return userRepository.findAll();
	}

	// get user by email
	public UserModel getUserByEmail(String email) {
		UserModel user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given emailId"));
		return user;
	}

	// delete User
	public void deleteUser(String userId) {
		UUID uId = UUID.fromString(userId);

		UserModel user = userRepository.findById(uId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		userRepository.delete(user);
	}

	// get User By ID

	public UserModel getUserById(String userId) {
		UUID uId = UUID.fromString(userId);
		UserModel user = userRepository.findById(uId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		return user;
	}
	
	//update User
	public UserModel updateUser(UserModel userData,String userId) {
		UUID uId = UUID.fromString(userId);
		UserModel existinguser = userRepository.findById(uId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found with given id"));
		
		if(userData.getName()!=null) existinguser.setName(userData.getName());
		if(userData.getImage()!=null) existinguser.setImage(userData.getImage());
		if(userData.getProvider()!=null) existinguser.setProvider(userData.getProvider());
		//Change the updation logic of chnage password
		if(userData.getPassword()!=null) existinguser.setPassword(userData.getPassword());
		
		existinguser.setEnable(userData.isEnable());
		existinguser.setUpdatedAt(Instant.now());
		UserModel updatedUser = userRepository.save(existinguser);
		
		return updatedUser;
	}

}
