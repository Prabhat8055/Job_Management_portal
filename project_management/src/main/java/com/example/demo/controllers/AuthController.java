package com.example.demo.controllers;

import java.time.Instant;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

import io.jsonwebtoken.JwtException;
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

	// API to renew access and refresh token.
	@PostMapping("/refresh")
	public ResponseEntity<TokenResponse> refreshToken(@RequestBody(required = false) RefreshTokenRequest body,
			HttpServletResponse response, HttpServletRequest request) {

		String refreshToken = readRefreshTokenFromRequest(body, request)
				.orElseThrow(() -> new BadCredentialsException("Invalid Refresh Token"));

		if (!jwtservice.isRefreshToken(refreshToken)) {
			throw new BadCredentialsException("Invalid refresh token type");
		}

		String jti = jwtservice.getJti(refreshToken);
		UUID userId = jwtservice.getUserId(refreshToken);

		RefreshTokenModel storedRefreshToken = refreshTokenrepo.findByJti(jti)
				.orElseThrow(() -> new RuntimeException("Token not found"));

		if (storedRefreshToken.isRevoked()) {
			throw new BadCredentialsException("Refresh token expired or revoked");
		}

		if (storedRefreshToken.getExpiresAt().isBefore(Instant.now())) {
			throw new BadCredentialsException("Refresh token expired");
		}

		if (!storedRefreshToken.getUser().getId().equals(userId)) {
			throw new BadCredentialsException("Refresh token does not belong to this user");
		}

		// Rotate refresh token
		storedRefreshToken.setRevoked(true);

		String newJti = UUID.randomUUID().toString();
		storedRefreshToken.setReplacedByToken(newJti);

		refreshTokenrepo.save(storedRefreshToken);

		UserModel user = storedRefreshToken.getUser();

		RefreshTokenModel newRefreshTokenOb = new RefreshTokenModel();
		newRefreshTokenOb.setJti(newJti);
		newRefreshTokenOb.setUser(user);
		newRefreshTokenOb.setCreatedAt(Instant.now());
		newRefreshTokenOb.setExpiresAt(Instant.now().plusSeconds(jwtservice.getRefreshTtlSeconds()));
		newRefreshTokenOb.setRevoked(false);

		refreshTokenrepo.save(newRefreshTokenOb);

		String newAccessToken = jwtservice.generateAccessToken(user);
		String newRefreshToken = jwtservice.generateRefreshToken(user, newRefreshTokenOb.getJti());

		cookieService.attachRefreshCookie(response, newRefreshToken, (int) jwtservice.getRefreshTtlSeconds());
		cookieService.addNoStoreHeaders(response);
		return ResponseEntity
				.ok(TokenResponse.of(newAccessToken, newRefreshToken, jwtservice.getAccessTtlSeconds(), user));
	}

	// this method will read refresh tokem from request headder or body
	private Optional<String> readRefreshTokenFromRequest(RefreshTokenRequest body, HttpServletRequest request) {
		// 1. Reading refresh token from cookie
		if (request.getCookies() != null) {
			Optional<String> fromCookie = Arrays.stream(request.getCookies())
					.filter(c -> cookieService.getRefreshTokenCookieName().equals(c.getName())).map(c -> c.getValue())
					.filter(v -> !v.isBlank()).findFirst();

			if (fromCookie.isPresent()) {
				return fromCookie;
			}
		}

		// 2. from body
		if (body != null && body.refreshToken() != null && !body.refreshToken().isBlank()) {
			return Optional.of(body.refreshToken());
		}

//		3. custom header
		String refreshHeader = request.getHeader("X-Refresh-Token");
		if (refreshHeader != null && !refreshHeader.isBlank()) {
			return Optional.of(refreshHeader.trim());
		}

//		4. Authorization = bearer <token>
		String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String candidate = authHeader.substring(7).trim();
			if (!candidate.isEmpty()) {
				try {
					if (jwtservice.isRefreshToken(candidate)) {
						return Optional.of(candidate);
					}
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}

		return Optional.empty();

	}

	// logout
	@PostMapping("/logout")
	public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {

		readRefreshTokenFromRequest(null, request).ifPresent(token -> {
			try {
				// Check if it's a refresh token
				if (jwtservice.isRefreshToken(token)) {

					String jti = jwtservice.getJti(token);

					refreshTokenrepo.findByJti(jti).ifPresent(rt -> {
						rt.setRevoked(true);
						refreshTokenrepo.save(rt);
					});
				}
			} catch (JwtException ignored) {
				// ignore invalid token
			}
		});

		// USe CookieUtil
		cookieService.clearRefreshCookie(response);
		cookieService.addNoStoreHeaders(response);
		SecurityContextHolder.clearContext();
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

	}
}
