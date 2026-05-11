package com.example.demo.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class CookieService {
	private final String refreshTokenCookieName;
	private final boolean cookieHttpOnly;
	private final boolean cookieSecure;
	private final String cookieDomain;
	private final String cookieSameSite;

	public CookieService(@Value("${security.jwt.refresh-token-cookie-name}") String refreshTokenCookieName,
			@Value("${security.jwt.cookie-http-only}") boolean cookieHttpOnly,
			@Value("${security.jwt.cookie-secure}") boolean cookieSecure,
			@Value("${security.jwt.cookie-domain}") String cookieDomain,
			@Value("${security.jwt.cookie-same-site}") String cookieSameSite) {
		super();
		this.refreshTokenCookieName = refreshTokenCookieName;
		this.cookieHttpOnly = cookieHttpOnly;
		this.cookieSecure = cookieSecure;
		this.cookieDomain = cookieDomain;
		this.cookieSameSite = cookieSameSite;
	}

	// create method to attach cookie to response
	public void attachRefreshCookie(HttpServletResponse response, String value, int maxAge) {
		var responseCookieBuilder = ResponseCookie.from(refreshTokenCookieName, value).httpOnly(cookieHttpOnly)
				.secure(cookieSecure).path("/").maxAge(maxAge).sameSite(cookieSameSite);

		if (cookieDomain != null && !cookieDomain.isBlank()) {
			responseCookieBuilder.domain(cookieDomain);
		}

		ResponseCookie responseCookie = responseCookieBuilder.build();
		response.addHeader(org.springframework.http.HttpHeaders.SET_COOKIE, responseCookie.toString());
	}

	// Clear refresh cookie
	public void clearRefreshCookie(HttpServletResponse response) {
		ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(refreshTokenCookieName, "").maxAge(0)
				.httpOnly(cookieHttpOnly).path("/").sameSite(cookieSameSite).secure(cookieSecure);

		if (cookieDomain != null && !cookieDomain.isBlank()) {
			builder.domain(cookieDomain);
		}

		ResponseCookie responseCookie = builder.build();
		response.addHeader(org.springframework.http.HttpHeaders.SET_COOKIE, responseCookie.toString());
	}
	
	//TODO see what it does
	public void addNoStoreHeaders(HttpServletResponse response) {
		response.setHeader(org.springframework.http.HttpHeaders.CACHE_CONTROL, "no-store");
		response.setHeader("Pragma","no-cache");
	}

	// Getter and setters

	public String getRefreshTokenCookieName() {
		return refreshTokenCookieName;
	}

	public boolean isCookieHttpOnly() {
		return cookieHttpOnly;
	}

	public boolean isCookieSecure() {
		return cookieSecure;
	}

	public String getCookieDomain() {
		return cookieDomain;
	}

	public String getCookieSameSite() {
		return cookieSameSite;
	}

}
