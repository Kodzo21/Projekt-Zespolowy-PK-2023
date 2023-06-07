package com.example.gigachatb.message;

import com.example.gigachatb.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public void saveMessage(MessageDTO messageDTO) {
        var user = userRepository.findByUniqueID(messageDTO.getSender()).orElseThrow();
        Message message = Message.builder()
                .conversationId(messageDTO.getConversation())
                .userSendingId(user.getUserId())
                .text(messageDTO.getText())
                .sendTime(messageDTO.getSendTime())
                .build();
        messageRepository.save(message);
    }
}
