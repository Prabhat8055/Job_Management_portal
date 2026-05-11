package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;

@Service
public class CustumUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userrepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userrepository.findByEmail(username)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid UserName or Password"));
	}

}
