package com.example.gigachatb.conversation;


import com.example.gigachatb.message.MessageDTO;
import com.example.gigachatb.user.User;
import com.example.gigachatb.user.UserMapper;
import com.example.gigachatb.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserService userService;

    public List<String> getUsersUniqueIDByMessageDTO(MessageDTO messageDTO) {
        var conversation = conversationRepository.findByConversationId(messageDTO.getConversation());
        if(conversation.isEmpty()){
            conversation = Optional.of(Conversation.builder()
                    .users(List.of(userService.getUserByUniqueID(messageDTO.getSender()),
                            userService.getUserByUniqueID(messageDTO.getReceiver())))
                    .build());
            conversationRepository.save(conversation.get());
            messageDTO.setConversation(conversation.get().getConversationId());
        }

        var userlist = new ArrayList<>(conversation.get().getUsers());

        return userlist.stream().map(User::getUniqueID).collect(Collectors.toList());
    }


    public List<ConversationResponse> getAllConversations(int user) {
        var conversations = conversationRepository.findAllByUserId(user);
        if (conversations.isEmpty()) {
            return List.of();
        }

        var conversationMapper = new ConversationMapper(userService, new UserMapper());
        return conversationMapper.mapConversations(conversations);
    }

    public ConversationResponse createConversation(ConversationRequest conversationRequest) {
        var conversationMapper = new ConversationMapper(userService, new UserMapper());
        return  conversationMapper.apply(
                conversationRepository.save(Conversation.builder()
                .users(userService.getUsersByUniqueID(conversationRequest.getParticipants()))
                .build()));
    }

    public Conversation getConversationById(int conversation) {
        return conversationRepository.findByConversationId(conversation).orElseThrow();
    }

    public List<String> getUsersUniqueIDByConversationId(int conversationId) {
            var conversation = conversationRepository.findByConversationId(conversationId);
            if(conversation.isEmpty()){
                return List.of();
            }
            var userlist = new ArrayList<>(conversation.get().getUsers());
            return userlist.stream().map(User::getUniqueID).collect(Collectors.toList());
    }

    public ConversationResponse getConversationResponseById(int id) {
        return new ConversationMapper(userService, new UserMapper()).apply(getConversationById(id));
    }
}
