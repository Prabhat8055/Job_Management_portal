package com.example.demo.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.demo.models.Role;
import com.example.demo.models.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	private SecretKey key;
	private long accessTtlSeconds;
	private long refreshTtlSeconds;
	private String issuer;

	public JwtService(
			@Value("${security.jwt.secret}") String secret,
			@Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
			@Value("${security.jwt.refresh-ttl-seconds}") long refreshTtlSeconds,
			@Value("${security.jwt.issuer}") String issuer) {

		if (secret == null || secret.length() < 64) {
			throw new IllegalArgumentException("Invalid secret");
		}

		this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.accessTtlSeconds = accessTtlSeconds;
		this.refreshTtlSeconds = refreshTtlSeconds;
		this.issuer = issuer;

	}

	// generate access token
	public String generateAccessToken(UserModel user) {
		Instant now = Instant.now();
		List<String> roles = user.getRoles() == null ? List.of() : user.getRoles().stream().map(Role::getName).toList();
		return Jwts.builder().id(UUID.randomUUID().toString()).subject(user.getId().toString()).issuer(issuer)
				.issuedAt(Date.from(now)).expiration(Date.from(now.plusSeconds(accessTtlSeconds)))
				.claims(Map.of("email", user.getEmail(), "roles", roles, "type", "access"))
				.signWith(key, io.jsonwebtoken.SignatureAlgorithm.HS512).compact();
	}

	// generate refresh token
	public String generateRefreshToken(UserModel user, String jti) {
		Instant now = Instant.now();
		return Jwts.builder().id(jti).subject(user.getId().toString()).issuer(issuer).issuedAt(Date.from(now))
				.expiration(Date.from(now.plusSeconds(refreshTtlSeconds))).claim("typ", "refresh")
				.signWith(key, io.jsonwebtoken.SignatureAlgorithm.HS512).compact();
	}

	// parse the token
	public Jws<Claims> parse(String token) {
		try {
			return Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
		} catch (JwtException e) {
			throw e;
		}
	}

	public boolean isAccessToken(String token) {
		Claims c = parse(token).getPayload();
		return "access".equals(c.get("type"));
	}

	public boolean isRefreshToken(String token) {
		Claims c = parse(token).getPayload();
		return "refresh".equals(c.get("type"));
	}

	public UUID getUserId(String token) {
		Claims c = parse(token).getPayload();
		return UUID.fromString(c.getSubject());
	}

	public String getJti(String token) {
		return parse(token).getPayload().getId();
	}

	public List<String> getRoles(String token) {
		Claims c = parse(token).getPayload();
		return (List<String>) c.get("roles");

	}

	public SecretKey getKey() {
		return key;
	}

	public void setKey(SecretKey key) {
		this.key = key;
	}

	public long getAccessTtlSeconds() {
		return accessTtlSeconds;
	}

	public void setAccessTtlSeconds(long accessTtlSeconds) {
		this.accessTtlSeconds = accessTtlSeconds;
	}

	public long getRefreshTtlSeconds() {
		return refreshTtlSeconds;
	}

	public void setRefreshTtlSeconds(long refreshTtlSeconds) {
		this.refreshTtlSeconds = refreshTtlSeconds;
	}

	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

}
