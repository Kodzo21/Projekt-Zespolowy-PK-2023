package com.example.gigachatb.message;


import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @SendTo("/topic/messages")
    @MessageMapping("/chat")
    public MessageDTO getMessage(@Payload MessageDTO messageDTO){
        messageService.saveMessage(messageDTO);
        return messageDTO;
    }
}
