package com.svet.authservice.security.jwt;

import com.svet.authservice.dto.JwtDto;
import com.svet.authservice.services.MyUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("app.jwtSecret")
    private String jwtSecret;

    @Value("app.jwtExpirationMs")
    private int jwtExpirationMs;

    @Value("app.jwtRefreshExpirationMs")
    private int jwtRefreshExpirationMs;

    public JwtDto generateJwtToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        JwtDto jwtDto = new JwtDto();
        jwtDto.setToken(generateJwtToken(claims, username));
        jwtDto.setRefreshToken(generateRefreshToken(generateRefreshToken(username)));
        return jwtDto;
    }

    private String generateJwtToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(new Date().getTime() + jwtExpirationMs))
                .and()
                .signWith(getSecretKey())
                .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .expiration(new Date(new Date().getTime() + jwtRefreshExpirationMs))
                .signWith(getSecretKey())
                .compact();
    }

    private SecretKey getSecretKey() {
        byte[] encodedKey = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(encodedKey);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, MyUserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
