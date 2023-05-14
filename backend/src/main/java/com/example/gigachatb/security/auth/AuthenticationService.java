package com.example.gigachatb.security.auth;


import com.example.gigachatb.security.jwt.JWTService;
import com.example.gigachatb.security.token.Token;
import com.example.gigachatb.security.token.TokenRepository;
import com.example.gigachatb.security.token.TokenService;
import com.example.gigachatb.security.token.TokenType;
import com.example.gigachatb.user.Role;
import com.example.gigachatb.user.User;
import com.example.gigachatb.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
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
        userRepository.save(user);
        var token = jwtService.generateToken(user);
        saveUserToken(user, token);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }



    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var token = jwtService.generateToken(user);
        revokeTokens(user);
        saveUserToken(user, token);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    private void saveUserToken(User user, String token) {
        var userToken = Token.builder()
                .user(user)
                .token(token)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenService.saveToken(userToken);
    }

    private void revokeTokens(User user) {
        var tokens = tokenService.getValidTokensByUser(user.getUserId());
        if (tokens.isEmpty()) return;
        tokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
            tokenService.saveToken(token);
        });
    }
}