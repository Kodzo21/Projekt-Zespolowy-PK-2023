package com.example.gigachatb.conversation;

import com.example.gigachatb.user.User;
import com.example.gigachatb.user.UserMapper;
import com.example.gigachatb.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.function.Function;

@RequiredArgsConstructor
public class ConversationMapper implements Function<Conversation,ConversationResponse> {
    private final UserService userService;
    private final UserMapper userMapper;
    @Override
    public ConversationResponse apply(Conversation conversation) {
        var participants = conversation.getUsers().stream().map(User::getUniqueID).toList();
        return ConversationResponse.builder()
                .id(conversation.getConversationId())
                .participants(userMapper.mapUsers(userService.getUsersByUniqueID(participants)))
                .build();
    }

    public List<ConversationResponse> mapConversations(List<Conversation> conversations) {
        return conversations.stream().map(this).toList();
    }



}
