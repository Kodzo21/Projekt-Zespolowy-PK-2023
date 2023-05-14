package com.example.gigachatb.security.token;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public void saveToken(Token token) {
        tokenRepository.save(token);
    }

    public List<Token> getValidTokensByUser(int id) {
        return tokenRepository.findAllValidTokenByUser(id);
    }

    public Optional<Token> getToken(String token) {
        return tokenRepository.findByToken(token);
    }
}
