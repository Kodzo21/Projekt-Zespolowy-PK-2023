package com.example.gigachatb.message;


import com.example.gigachatb.conversation.ConversationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final MessageService messageService;
    private final ConversationService conversationService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @SendTo("/topic/messages")
    @MessageMapping("/hello")
    public void sendMessage(MessageDTO messageDTO) {
        messageService.saveMessage(messageDTO);
        var userList = conversationService.getUsersUniqueID(messageDTO);
        //TODO: set id as websocket session
        try {
            for (String id : userList) {
                simpMessagingTemplate.convertAndSendToUser(id, "/queue/messages", messageDTO);
            }
        }catch (MessagingException e){
            log.error("Error sending message to user/s: " + e.getMessage());
        }
    }
}