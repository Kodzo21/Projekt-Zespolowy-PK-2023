package com.example.gigachatb.message;

import com.example.gigachatb.conversation.Conversation;
import com.example.gigachatb.file.File;
import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Message {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "message_id")
    private int messageId;
    @Basic
    @Column(name = "conversation_id")
    private int conversationId;
    @Basic
    @Column(name = "user_sending_id")
    private int userSendingId;
    @Basic
    @Column(name = "text")
    private String text;
    @Basic
    @Column(name = "send_time")
    private Timestamp sendTime;
    @OneToMany(mappedBy = "messageByMessageId")
    private Collection<File> filesByMessageId;
    @ManyToOne
    @JoinColumn(name = "conversation_id", referencedColumnName = "conversation_id", nullable = false)
    private Conversation conversationByConversationId;
    @ManyToOne
    @JoinColumn(name = "user_sending_id", referencedColumnName = "user_id", nullable = false)
    private User userByUserSendingId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return messageId == message.messageId && conversationId == message.conversationId && userSendingId == message.userSendingId && Objects.equals(text, message.text) && Objects.equals(sendTime, message.sendTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageId, conversationId, userSendingId, text, sendTime);
    }

}
