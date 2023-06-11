package com.example.gigachatb.conversation;


import com.example.gigachatb.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping("api/v1/conversation")
@Slf4j
public class ConversationController {


    private final UserService userService;
    private final ConversationService conversationService;
    @GetMapping("/all")
    public List<ConversationResponse> getAllConversations(Authentication authentication) {
        var user = authentication.getName();
        var userEntity = userService.getUserByEmail(user);
        return conversationService.getAllConversations(userEntity.getUserId());
    }


    @PostMapping("/create")
    public ConversationResponse createConversation(@RequestBody ConversationRequest conversationRequest) {
        return conversationService.createConversation(conversationRequest);
    }

    @GetMapping("/{id}")
    public ConversationResponse getConversationById(@PathVariable int id) {
        var conv =  conversationService.getConversationResponseById(id);
        log.info( conv.toString());
        return conv;
    }
}
