package com.example.gigachatb.message;

import com.example.gigachatb.conversation.Conversation;
import com.example.gigachatb.file.File;
import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_message", schema = "public", catalog = "")
public class Message {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "message_id")
    private int messageId;
    @Basic
    @Column(name = "text")
    private String text;
    @Basic
    @Column(name = "send_time")
    private Timestamp sendTime;
    @OneToMany(mappedBy = "messageByMessageId")
    private List<File> filesByMessageId;
    @ManyToOne
    @JoinColumn(name = "conversation_id", referencedColumnName = "conversation_id")
    private Conversation conversationByConversationId;
    @ManyToOne
    @JoinColumn(name = "user_sending_id", referencedColumnName = "user_id")
    private User userByUserSendingId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return messageId == message.messageId  && Objects.equals(text, message.text) && Objects.equals(sendTime, message.sendTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageId, text, sendTime);
    }

}
