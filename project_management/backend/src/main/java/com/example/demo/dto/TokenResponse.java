package com.example.demo.dto;

import com.example.demo.models.UserModel;

public record TokenResponse(String accessToken, String refreshToken, long expiresIn, String tokenType, UserModel user) {

	public static TokenResponse of(String accessToken, String refreshToken, long expiresIn, UserModel user) {
		return new TokenResponse(accessToken, refreshToken, expiresIn, "Bearer", user);
	}

}
