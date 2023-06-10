package com.example.gigachatb.message;

import com.example.gigachatb.conversation.ConversationService;
import com.example.gigachatb.user.UserRepository;
import com.example.gigachatb.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final UserService userService;
    private final MessageMapper messageMapper = new MessageMapper();


    public void saveMessage(MessageDTO messageDTO) {
        log.info("Saving message: {}", messageDTO);
        var user = userService.getUserByUniqueID(messageDTO.getSender());
        Message message = Message.builder()
                .conversationByConversationId(conversationService.getConversationById(messageDTO.getConversation()))
                .userByUserSendingId(userService.getUserById(user.getUserId()))
                .text(messageDTO.getText())
                .sendTime(messageDTO.getSendTime())
                .build();
        messageRepository.save(message);
    }

    public List<MessageDTO> getMessagesByConversationId(int conversationId) {
        var messages = messageRepository.findAllByConversationId(conversationId);
        return messageMapper.mapMessages(messages);
    }
}
