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
    @Column(name = "uploaded_at")
    private Timestamp uploadedAt;
    @ManyToOne
    @JoinColumn(name = "user_uploading_id", referencedColumnName = "user_id")
    private User userByUserUploadingId;
    @ManyToOne
    @JoinColumn(name = "conversation_id", referencedColumnName = "conversation_id")
    private Conversation conversationByConversationId;
    @ManyToOne
    @JoinColumn(name = "message_id", referencedColumnName = "message_id")
    private Message messageByMessageId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        File file = (File) o;
        return fileId == file.fileId && sizeByte == file.sizeByte && Objects.equals(filename, file.filename) && Arrays.equals(content, file.content) && Objects.equals(uploadedAt, file.uploadedAt) ;
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(fileId, filename, sizeByte, uploadedAt);
        result = 31 * result + Arrays.hashCode(content);
        return result;
    }

}
