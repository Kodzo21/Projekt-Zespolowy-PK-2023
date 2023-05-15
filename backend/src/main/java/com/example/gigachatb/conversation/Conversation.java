package com.example.gigachatb.conversation;

import com.example.gigachatb.participant.Participant;
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
    @Column(name = "start_time")
    private Timestamp startTime;
    @OneToMany(mappedBy = "conversationByConversationId")
    @Column(insertable = false,updatable = false)
    private Collection<File> filesByConversationId;
    @OneToMany(mappedBy = "conversationByConversationId")
    @Column(insertable = false,updatable = false)
    private Collection<Message> messagesByConversationId;
    @OneToMany(mappedBy = "conversationByConversationId")
    private Collection<Participant> participantsByConversationId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return conversationId == that.conversationId && Objects.equals(startTime, that.startTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(conversationId, startTime);
    }

}
