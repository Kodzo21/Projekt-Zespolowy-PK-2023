package com.example.gigachatb.message;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public void saveMessage(MessageDTO messageDTO) {
        Message message = Message.builder()
                .conversationId(messageDTO.getConversationId())
                .userSendingId(messageDTO.getUserSendingId())
                .text(messageDTO.getText())
                .sendTime(messageDTO.getSendTime())
                .build();
        messageRepository.save(message);
    }
}
