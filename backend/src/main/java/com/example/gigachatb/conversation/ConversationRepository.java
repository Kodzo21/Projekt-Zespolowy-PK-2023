package com.example.gigachatb.conversation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    Optional<Conversation> findByConversationId(int conversationId);

    @Query(value = """
            SELECT u.conversationsByUserId from User u \s
            WHERE u.userId = :userId
            """)
    List<Conversation> findAllByUserId(int userId);

}

