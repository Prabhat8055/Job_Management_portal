package com.example.demo.security;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.demo.models.Provider;
import com.example.demo.models.RefreshTokenModel;
import com.example.demo.models.UserModel;
import com.example.demo.repository.RefreshTokenRepository;
import com.example.demo.repository.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {


	private static final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

	@Value("${app.cors.auth.frontend.success-redirect}")
	private String successRedirectUrl;

	@Value("${app.cors.auth.frontend.failure-redirect}")
	private String failureRedirectUrl;
	
	
	
	@Autowired
	UserRepository userRepo;
	@Autowired
	JwtService jwtService;
	@Autowired
	RefreshTokenRepository refreshTokenRepo;
	@Autowired
	CookieService cookieService;
	
    OAuth2SuccessHandler(CookieService cookieService) {
        this.cookieService = cookieService;
    }

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

		// identify user
		String registrationId = "unknown";
		if (authentication instanceof OAuth2AuthenticationToken token) {
			registrationId = token.getAuthorizedClientRegistrationId();
		}

		UserModel user =null;
//		switch (registrationId) {
//		case "google" -> {
//
//			String googleId = oAuth2User.getAttributes().getOrDefault("sub", "").toString();
//			String email = oAuth2User.getAttributes().getOrDefault("email", "").toString();
//			String name = oAuth2User.getAttributes().getOrDefault("name", "").toString();
//			String picture = oAuth2User.getAttributes().getOrDefault("picture", "").toString();
//
//			user = new UserModel();
//			user.setEmail(email);
//			user.setName(name);
//			user.setEnable(true);
//			user.setImage(picture);
//			user.setProvider(Provider.GOOGLE);
//
//			userRepo.findByEmail(email).ifPresentOrElse(user1 -> {
//				logger.info("User is there in Database");
//				logger.info(user1.toString());
//			}, () -> {
//				userRepo.save(user);
//			});
//		}
//		default -> {
//			throw new RuntimeException("Invalid registration Id");
//		}
//
//		}
		
	    if ("google".equals(registrationId)) {
	        String email   = oAuth2User.getAttributes().getOrDefault("email",   "").toString();
	        String name    = oAuth2User.getAttributes().getOrDefault("name",    "").toString();
	        String picture = oAuth2User.getAttributes().getOrDefault("picture", "").toString();

	        // ✅ orElseGet — always returns the saved/existing entity with a real DB id
	        user = userRepo.findByEmail(email).orElseGet(() -> {
	            UserModel newUser = new UserModel();
	            newUser.setEmail(email);
	            newUser.setName(name);
	            newUser.setEnable(true);
	            newUser.setImage(picture);
	            newUser.setProvider(Provider.GOOGLE);
	            return userRepo.save(newUser);
	        });
	    }
		
		 if (user == null) {
		        response.sendRedirect(failureRedirectUrl);
		        return;
		    }

		// creating a refresh token so that new access token can be generated
		String jti = UUID.randomUUID().toString();
		RefreshTokenModel refreshTokenObj = new RefreshTokenModel();
		refreshTokenObj.setJti(jti);
		refreshTokenObj.setUser(user);
		refreshTokenObj.setRevoked(false);
		refreshTokenObj.setCreatedAt(Instant.now());
		refreshTokenObj.setExpiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()));
		
		refreshTokenRepo.save(refreshTokenObj);
		String accessToken = jwtService.generateAccessToken(user);
		String refreshToken = jwtService.generateRefreshToken(user,refreshTokenObj.getJti());
		
		cookieService.attachRefreshCookie(response, refreshToken, (int)jwtService.getRefreshTtlSeconds());


		
//		response.getWriter().write("Login SuccessFul");
		response.sendRedirect(successRedirectUrl);

	}

}
