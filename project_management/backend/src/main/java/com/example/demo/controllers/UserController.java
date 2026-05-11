package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.UserModel;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
	
	@Autowired
	UserService service;
	
	
	//Create User
	@PostMapping
	public UserModel createUser(@RequestBody UserModel user) {
		return service.createUser(user);
	}
	
	//Get All Users
	@GetMapping
	public Iterable<UserModel> getAllUsers(){
		return service.getAllUsers();
	}
	
	//Get user By email
	@GetMapping("email/{email}")
	public UserModel getUserByEmail(@PathVariable String email) {
		return service.getUserByEmail(email);
	}
	
	
	//delete user
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable String userId)
	{
		service.deleteUser(userId);
	}
	
	//Update user
	@PutMapping("/{userId}")
	public UserModel updateUser(@RequestBody UserModel model,@PathVariable String userId)
	{
		return service.updateUser(model, userId);
	}
	
	
}
