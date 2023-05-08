package com.example.gigachatb.conversation;

import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import com.example.gigachatb.file.File;
import com.example.gigachatb.message.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Data
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
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "start_time")
    private Timestamp startTime;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User userByUserId;
    @OneToMany(mappedBy = "conversationByConversationId")
    private Collection<File> filesByConversationId;
    @OneToMany(mappedBy = "conversationByConversationId")
    private Collection<Message> messagesByConversationId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return conversationId == that.conversationId && userId == that.userId && Objects.equals(startTime, that.startTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(conversationId, userId, startTime);
    }

}
