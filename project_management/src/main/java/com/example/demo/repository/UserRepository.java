package com.example.demo.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, UUID> {

	Optional<UserModel> findByEmail(String email);
}
