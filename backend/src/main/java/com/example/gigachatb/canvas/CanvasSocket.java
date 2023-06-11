package com.example.gigachatb.canvas;


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
public class CanvasSocket {

    private final ConversationService conversationService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @SendTo("/topic/canvas")
    @MessageMapping("/canvasr")
    public CanvasDTO sendCanvas(CanvasDTO canvasDTO) {

        var userList = conversationService.getUsersUniqueIDByConversationId(canvasDTO.getConversationId());
        //TODO: set id as websocket session
        try {
            for (String id : userList) {
                log.info("Sending message to user: " + id);
                simpMessagingTemplate.convertAndSend( "/topic/canvas/"+id, canvasDTO);
            }
        }catch (MessagingException e){
            log.error("Error sending message to user/s: " + e.getMessage());
        }
        return canvasDTO;
    }

}
