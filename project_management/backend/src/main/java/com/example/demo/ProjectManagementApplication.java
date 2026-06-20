package com.example.demo;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.config.AppConstants;
import com.example.demo.models.Role;
import com.example.demo.repository.RoleRepository;

@SpringBootApplication
public class ProjectManagementApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepo;

	public static void main(String[] args) {
		SpringApplication.run(ProjectManagementApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		createRoleIfNotExists("ROLE_" + AppConstants.ADMIN_ROLE);
		createRoleIfNotExists("ROLE_" + AppConstants.GUEST_ROLE);

	}

	private void createRoleIfNotExists(String roleName) {
		roleRepo.findByName(roleName).ifPresentOrElse(role -> {
			System.out.println("Admin role already exist: " + role.getName());
		}, () -> {
			Role role = new Role();
			role.setId(UUID.randomUUID());
			role.setName(roleName);
			roleRepo.save(role);

		});

	}

}
