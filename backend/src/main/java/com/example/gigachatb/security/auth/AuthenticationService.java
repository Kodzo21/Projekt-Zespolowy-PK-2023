package com.example.gigachatb.security.auth;


import com.example.gigachatb.security.jwt.JWTService;
import com.example.gigachatb.security.token.Token;
import com.example.gigachatb.security.token.TokenRepository;
import com.example.gigachatb.security.token.TokenService;
import com.example.gigachatb.security.token.TokenType;
import com.example.gigachatb.user.Role;
import com.example.gigachatb.user.User;
import com.example.gigachatb.user.UserRepository;
import com.example.gigachatb.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userService.addUser(user);
        var token = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(user,token);
        return AuthenticationResponse.builder(
                )
                .token(token)
                .refreshToken(refreshToken)
                .uniqueId(user.getUniqueID())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );
        var user = userService.getUserByEmail(request.getEmail());
        var token = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeTokens(user);
        saveUserToken(user,token);
        return AuthenticationResponse.builder()
                .token(token)
                .uniqueId(user.getUniqueID())
                .refreshToken(refreshToken)
                .build();
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractEmail(refreshToken);
        if (userEmail != null) {
            var user = userService.getUserByEmail(userEmail);

            if (jwtService.isTokenValid(refreshToken,user)){
                var token = jwtService.generateToken(user);
                revokeTokens(user);
                saveUserToken(user,token);
                var authResponse = AuthenticationResponse.builder()
                        .token(token)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
            }
        }
    }

    private void saveUserToken(User user, String token) {
        var tokenEntity = Token.builder()
                .token(token)
                .user(user)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        tokenService.saveToken(tokenEntity);
    }

    private void revokeTokens(User user) {
        var validTokens = tokenService.getAllValidTokenByUser(user.getUserId());
        if (validTokens.isEmpty()) return;
        validTokens.forEach(token -> {
            token.setRevoked(true);
        });
        tokenService.saveAllTokens(validTokens);
    }
}