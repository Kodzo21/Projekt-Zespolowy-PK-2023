package com.example.gigachatb.conversation;


import com.example.gigachatb.message.MessageDTO;
import com.example.gigachatb.user.User;
import com.example.gigachatb.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserService userService;

    public List<String> getUsersUniqueID(MessageDTO messageDTO) {
        var conversation = conversationRepository.findByConversationId(messageDTO.getConversation()).orElse(
                Conversation.builder()
                        .users(List.of(userService.getUserByUniqueID(messageDTO.getSender()),
                                userService.getUserByUniqueID(messageDTO.getReceiver())))
                        .build()

        );

        var userlist = conversation.getUsers();

        return userlist.stream().map(User::getUniqueID).collect(Collectors.toList());
    }
}
