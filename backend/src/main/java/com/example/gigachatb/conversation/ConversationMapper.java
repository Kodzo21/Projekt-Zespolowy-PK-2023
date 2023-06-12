package com.example.gigachatb.conversation;

import com.example.gigachatb.user.User;
import com.example.gigachatb.user.UserMapper;
import com.example.gigachatb.user.UserService;
import lombok.RequiredArgsConstructor;

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
                .name(conversation.getName())
                .participants(userMapper.mapUsers(userService.getUsersByUniqueID(participants)))
                .build();
    }

    public List<ConversationResponse> mapConversations(List<Conversation> conversations) {
        return conversations.stream().map(this).toList();
    }


    public Conversation mapConversationRequest(ConversationRequest conversationRequest) {
        var users = userService.getUsersByUniqueID(conversationRequest.getParticipants());
        return Conversation.builder()
                .name(conversationRequest.getName())
                .users(users)
                .filesByConversationId(List.of())
                .messagesByConversationId(List.of())
                .build();
    }
}
