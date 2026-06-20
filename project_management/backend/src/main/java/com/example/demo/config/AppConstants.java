package com.example.demo.config;

public class AppConstants {

	public static String[] AUTH_PUBLIC_URLS = { "/api/v1/auth/**", "/v3/api-docs/**", "/swagger-ui.html",
			"/swagger-ui/**", "/error","/oauth2/**",
		    "/login/oauth2/**",
		    "/.well-known/**"   };
	
	
	public static final String ADMIN_ROLE = "ADMIN";
	public static final String GUEST_ROLE = "GUEST";
	
}
