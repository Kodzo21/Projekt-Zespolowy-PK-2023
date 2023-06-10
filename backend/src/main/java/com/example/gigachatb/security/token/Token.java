package com.example.gigachatb.security.token;

import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Basic
    @Column(name = "expiration_date")
    private boolean expired;
    @Basic
    @Column(name = "revoked")
    private boolean revoked;
    @Basic
    @Column(name = "token")
    private String token;
    @Basic
    @Column(name = "token_type")
    private TokenType tokenType = TokenType.BEARER;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    private User user;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Token token1 = (Token) o;
        return id == token1.id && revoked == token1.revoked && Objects.equals(createdAt, token1.createdAt) && Objects.equals(expired, token1.expired) && Objects.equals(token, token1.token) && Objects.equals(tokenType, token1.tokenType) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, createdAt, expired, revoked, token, tokenType);
    }

}
