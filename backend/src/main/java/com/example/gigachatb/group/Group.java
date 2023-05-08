package com.example.gigachatb.group;

import jakarta.persistence.*;
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
public class Group {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "group_id")
    private int groupId;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Basic
    @Column(name = "user_creator_id")
    private int userCreatorId;
    @Basic
    @Column(name = "conversation_id")
    private int conversationId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Group group = (Group) o;
        return groupId == group.groupId && userCreatorId == group.userCreatorId && conversationId == group.conversationId && Objects.equals(name, group.name) && Objects.equals(createdAt, group.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(groupId, name, createdAt, userCreatorId, conversationId);
    }

}
