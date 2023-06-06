package com.example.gigachatb.conversation;


import com.example.gigachatb.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public List<String> getUsersUniqueID(int conversationId) {
        var conversation = conversationRepository.findByConversationId(conversationId).orElseThrow();

        var userlist = conversation.getUsers();

        return userlist.stream().map(User::getUniqueID).collect(Collectors.toList());
    }
}
