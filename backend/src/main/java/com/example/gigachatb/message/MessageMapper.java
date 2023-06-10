package com.example.gigachatb.message;

import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.function.Function;

public class MessageMapper implements Function<Message,MessageDTO> {
    @Override
    public MessageDTO apply(Message message) {
        return MessageDTO.builder()
                .conversation(message.getConversationByConversationId().getConversationId())
                .sender(message.getUserByUserSendingId().getUniqueID())
                .text(message.getText())
                .sendTime(message.getSendTime())
                .build();
    }

    public List<MessageDTO> mapMessages(List<Message> messages) {
        return messages.stream().map(this).toList();
    }


}
