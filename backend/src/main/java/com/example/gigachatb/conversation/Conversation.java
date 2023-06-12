package com.example.gigachatb.conversation;

import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import com.example.gigachatb.file.File;
import com.example.gigachatb.message.Message;
import lombok.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Conversation {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "conversation_id")
    private int conversationId;
    @Basic
    @Column(name = "start_time")
    private Timestamp startTime;

    @Basic
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "conversationByConversationId")
    private List<File> filesByConversationId;
    @OneToMany(mappedBy = "conversationByConversationId")
    private List<Message> messagesByConversationId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "participant",
            joinColumns = @JoinColumn(name = "conversation_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))

    private List<User> users;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return conversationId == that.conversationId  && Objects.equals(startTime, that.startTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(conversationId,  startTime);
    }

}
