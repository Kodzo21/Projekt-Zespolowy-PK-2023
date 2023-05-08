package com.example.gigachatb.group;

import com.example.gigachatb.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "group_user", schema = "public", catalog = "postgres")
public class GroupUser {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "group_id")
    private int groupId;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "join_date")
    private Timestamp joinDate;
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", nullable = false)
    private Group groupByGroupId;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User userByUserId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GroupUser groupUser = (GroupUser) o;
        return groupId == groupUser.groupId && userId == groupUser.userId && Objects.equals(joinDate, groupUser.joinDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(groupId, userId, joinDate);
    }

}
