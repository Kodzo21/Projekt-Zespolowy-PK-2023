package com.example.gigachatb.message;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/messages")
public class MessageController {

    private final MessageService messageService;
    @GetMapping("/{conversationId}")
    public List<MessageDTO> getMessagesByConversationId(@PathVariable int conversationId) {
        log.info("getMessagesByConversationId");
        return messageService.getMessagesByConversationId(conversationId);
    }
}
