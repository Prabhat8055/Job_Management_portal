package com.example.demo.security;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.demo.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	JwtService jwtservice;

	@Autowired
	UserRepository userrepository;

	private org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String header = request.getHeader("Authorization");
		logger.info(header);

		if (header != null && header.startsWith("Bearer ")) {
			// we have to Extract ,validate ,create authenticate and set in security context

			String token = header.substring(7);
			// check for access token
			if (!jwtservice.isAccessToken(token)) {
				// pass the message
				filterChain.doFilter(request, response);
				return;
			}
			try {

				Jws<Claims> parse = jwtservice.parse(token);
				Claims payload = parse.getPayload();
				String userId = payload.getSubject();
				UUID userUuid = UUID.fromString(userId);

				userrepository.findById(userUuid).ifPresent(user -> {

					// user found from DB
					List<GrantedAuthority> authorities = user.getAuthorities() == null ? List.of()
							: user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName()))
									.collect(Collectors.toList());
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							user.getEmail(), null, authorities);

					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					// final line to set the authentication to security context
					if (SecurityContextHolder.getContext().getAuthentication() == null)
						SecurityContextHolder.getContext().setAuthentication(authentication);
				}

				);

			} catch (ExpiredJwtException e) {
				e.printStackTrace();
			} catch (MalformedJwtException e) {
				e.printStackTrace();
			} catch (JwtException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();

			}
		}
		filterChain.doFilter(request, response);

	}
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
		return request.getRequestURI().startsWith("/api/v1/auth");
	}

}
