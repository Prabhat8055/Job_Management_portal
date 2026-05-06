package com.example.demo.controllers;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RefreshTokenRequest;
import com.example.demo.dto.TokenResponse;
import com.example.demo.models.RefreshTokenModel;
import com.example.demo.models.UserModel;
import com.example.demo.repository.RefreshTokenRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CookieService;
import com.example.demo.security.JwtService;
import com.example.demo.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	AuthService service;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtService jwtservice;

	@Autowired
	RefreshTokenRepository refreshTokenrepo;

	@Autowired
	CookieService cookieService;

	@PostMapping("/register")
	public UserModel registerUser(@RequestBody UserModel model) {
		return service.registerUser(model);
	}

	// login

	@PostMapping("/login")
	public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
		// authenticate
		Authentication authentication = authenticate(loginRequest);
		// fetch user
		UserModel user = userRepository.findByEmail(loginRequest.email())
				.orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

		// check if user is enable
		if (!user.isEnable()) {
			throw new DisabledException("User is Disable");
		}

		// create a obj of refesh token to store it in db
		String jti = UUID.randomUUID().toString();
		RefreshTokenModel refreshTokenObj = new RefreshTokenModel();
		refreshTokenObj.setJti(jti);
		refreshTokenObj.setUser(user);
		refreshTokenObj.setCreatedAt(Instant.now());
		refreshTokenObj.setExpiresAt(Instant.now().plusSeconds(jwtservice.getRefreshTtlSeconds()));
		refreshTokenObj.setRevoked(false);

		// refresh token info saved
		refreshTokenrepo.save(refreshTokenObj);

		// generate Access Token
		String accessToken = jwtservice.generateAccessToken(user);
		String refreshToken = jwtservice.generateRefreshToken(user, refreshTokenObj.getJti());

		// use cookie service to attach refresh token in cookie.
		cookieService.attachRefreshCookie(response, refreshToken, (int) jwtservice.getRefreshTtlSeconds());
		cookieService.addNoStoreHeaders(response);

		TokenResponse tokenResponse = TokenResponse.of(accessToken, refreshToken, jwtservice.getAccessTtlSeconds(),
				user);

		return ResponseEntity.ok(tokenResponse);

	}

	private Authentication authenticate(LoginRequest loginRequest) {
		try {
			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
		} catch (Exception e) {
			throw new BadCredentialsException("Invalid Username or Password");
		}
	}
	
	
	//API to renew access and refresh token.
//	@PostMapping("/refresh")
//	public ResponseEntity<TokenResponse> refreshToken(@RequestBody(required = false) RefreshTokenRequest 	body
//			,HttpServletResponse response ,
//			HttpServletRequest request){
//		
//		String refreshToken = readRefreshTokenFromRequest(body,request);
//		
//	}
//	
//	
//	//this method will read refresh tokem from request headder or body
//	private String readRefreshTokenFromRequest(RefreshTokenRequest body, HttpServletRequest request) {
//			
//	}
}
