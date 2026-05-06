package com.example.demo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.RefreshTokenModel;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenModel, UUID>{

}
