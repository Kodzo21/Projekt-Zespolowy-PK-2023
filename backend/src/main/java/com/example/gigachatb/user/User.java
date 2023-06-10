package com.example.gigachatb.user;

import com.example.gigachatb.conversation.Conversation;
import com.example.gigachatb.file.File;
import com.example.gigachatb.message.Message;
import com.example.gigachatb.security.token.Token;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DialectOverride;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user", schema = "public", catalog = "")
public class User implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "password")
    private String password;
    @Basic
    @Column(name = "firstname")
    private String firstname;
    @Basic
    @Column(name = "lastname")
    private String lastname;

    @Basic
    @Generated(GenerationTime.INSERT)
    @Column(name = "unique_id", unique = true,columnDefinition = "varchar(255) default '#'::text || lpad(((nextval('user_user_id_seq'::regclass))::character varying)::text, 5, '0'::text)")
    private String uniqueID;

    @OneToMany(mappedBy = "userByUserUploadingId")
    private List<File> filesByUserId;

    @OneToMany(mappedBy = "userByUserSendingId")
    private List<Message> messagesByUserId;

    @ManyToMany(mappedBy = "users")
    private List<Conversation> conversationsByUserId;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userId == user.userId && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(firstname, user.firstname) && Objects.equals(lastname, user.lastname) && Objects.equals(uniqueID, user.uniqueID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, email, password, firstname, lastname,uniqueID);
    }


    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
