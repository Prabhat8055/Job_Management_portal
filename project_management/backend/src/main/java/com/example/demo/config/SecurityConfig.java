package com.example.demo.config;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.security.JwtAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
@Configuration
public class SecurityConfig {

	@Autowired
	JwtAuthenticationFilter jwtAuthFilter;

	@Autowired
	AuthenticationSuccessHandler successHandler;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {

		http.csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults())
				.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth.requestMatchers(AppConstants.AUTH_PUBLIC_URLS).permitAll() // 🔥
																												// important
						.anyRequest().authenticated())
				// OAuth2 configuration
				.oauth2Login(oauth2 -> oauth2.successHandler(successHandler).failureHandler(null))
				.logout(AbstractHttpConfigurer::disable)
				// runs when some unauthenticated person come to protected URL
				.exceptionHandling(ex -> ex.authenticationEntryPoint((request, response, e) -> {
					// error Message
					e.printStackTrace();
					response.setStatus(401);
					response.setContentType("application/json");
					String message = "Unauthorized access " + e.getMessage();
					Map<String, String> errorMap = Map.of("message", message, "statusCode", Integer.toString(401));
					// send errorMap to json
					// using this mapper we can convert our map to String
					var objectMapper = new ObjectMapper();
					response.getWriter().write(objectMapper.writeValueAsString(errorMap));
				})).addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.front-end-url}") String corsUrls) {

		String[] urls = corsUrls.trim().split(",");
		
		var config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList(urls));
		config.setAllowedMethods(List.of("GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH", "HEAD"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);

		var source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}
