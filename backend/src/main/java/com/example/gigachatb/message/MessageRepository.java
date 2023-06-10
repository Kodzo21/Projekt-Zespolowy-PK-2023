package com.example.gigachatb.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Integer> {


    @Query(value = """
            SELECT m from Message m\s
            where m.conversationByConversationId.conversationId = ?1
            """)
    List<Message> findAllByConversationId(int conversationId);
}
