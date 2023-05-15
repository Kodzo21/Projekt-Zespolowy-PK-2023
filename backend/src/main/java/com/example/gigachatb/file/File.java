package com.example.gigachatb.file;

import com.example.gigachatb.conversation.Conversation;
import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import com.example.gigachatb.message.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class File {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "file_id")
    private int fileId;
    @Basic
    @Column(name = "filename")
    private String filename;
    @Basic
    @Column(name = "size_byte")
    private int sizeByte;
    @Basic
    @Column(name = "content")
    private byte[] content;
    @Basic
    @Column(name = "user_uploading_id")
    private int userUploadingId;
    @Basic
    @Column(name = "uploaded_at")
    private Timestamp uploadedAt;
    @Basic
    @Column(name = "conversation_id")
    private int conversationId;
    @Basic
    @Column(name = "message_id")
    private Integer messageId;
    @ManyToOne
    @JoinColumn(name = "user_uploading_id", referencedColumnName = "user_id", nullable = false,insertable = false,updatable = false)
    private User userByUserUploadingId;
    @ManyToOne
    @JoinColumn(name = "conversation_id", referencedColumnName = "conversation_id", nullable = false,insertable = false,updatable = false)
    private Conversation conversationByConversationId;
    @ManyToOne
    @JoinColumn(name = "message_id", referencedColumnName = "message_id",insertable = false,updatable = false)
    private Message messageByMessageId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        File file = (File) o;
        return fileId == file.fileId && sizeByte == file.sizeByte && userUploadingId == file.userUploadingId && conversationId == file.conversationId && Objects.equals(filename, file.filename) && Arrays.equals(content, file.content) && Objects.equals(uploadedAt, file.uploadedAt) && Objects.equals(messageId, file.messageId);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(fileId, filename, sizeByte, userUploadingId, uploadedAt, conversationId, messageId);
        result = 31 * result + Arrays.hashCode(content);
        return result;
    }

}
